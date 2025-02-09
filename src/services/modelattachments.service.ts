/**
 * @module services
 */
import {EventEmitter, Injectable, OnDestroy} from "@angular/core";
import {Subject, Observable, BehaviorSubject} from "rxjs";

import {configurationService} from "./configuration.service";
import {session} from "./session.service";
import {backend} from "./backend.service";
import {toast} from "./toast.service";
import {language} from "./language.service";
import {broadcast} from "./broadcast.service";
import {model} from "./model.service";

/**
 * @ignore
 */
declare var moment: any;

/**
 * handles the model attachments. Can be instantiated in the contect of a model with an id and allows the dsplay as well as manipulation of attachments
 */
@Injectable()
export class modelattachments implements OnDestroy {
    /**
     * reference id will be sent with each backend request to enable canceling the pending requests
     */
    public httpRequestsRefID: string = window._.uniqueId('model_attachments_http_ref_');
    /**
     * the module of the parent object this is linked to
     */
    public module: string;

    /**
     * the id of the parent bean
     */
    public id: string;

    /**
     * the toal attachment count
     */
    public count: number = 0;

    /**
     * the files loaded
     */
    public files: any[] = [];

    /**
     * inidcates that the list of files is being loaded
     */
    public loading: boolean = false;

    /**
     * an emitter that emits when the atatchments are loaded
     */
    public loaded: boolean = false;

    /**
     * an emitter that emits when the atatchments are loaded
     */
    public loaded$: BehaviorSubject<boolean>;

    constructor(
        public backend: backend,
        public configurationService: configurationService,
        public session: session,
        public toast: toast,
        public broadcast: broadcast,
        public language: language
    ) {
        this.loaded$ = new BehaviorSubject<boolean>(false);
    }

    /**
     * returns the count of the attachments
     */
    public getCount(categoryId?: string): Observable<any> {
        let retSubject = new Subject();
        this.backend.getRequest(`common/spiceattachments/module/${this.module}/${this.id}/count`, {categoryId}, this.httpRequestsRefID).subscribe({
            next: response => {
                // set the count
                this.count = response.count;

                retSubject.next(this.count);
                retSubject.complete();
            },
            error: () => {
                retSubject.complete();
            }
        });
        return retSubject.asObservable();
    }

    /**
     * broadcasts the total number of files found
     * sends a reload information
     */
    public broadcastAttachmentCount() {
        this.broadcast.broadcastMessage('attachments.loaded', {
            module: this.module,
            id: this.id,
            attachmentcount: this.count,
            reload: true
        });
    }

    /**
     * loads the attachments
     */
    public getAttachments(categoryId?: string): Observable<any> {
        let retSubject = new Subject();

        this.files = [];
        this.loading = true;
        this.backend.getRequest(`common/spiceattachments/module/${this.module}/${this.id}`, {categoryId}, this.httpRequestsRefID).subscribe({
            next: response => {
                for (let attId in response) {
                    if (!this.files.find(a => a.id == attId)) {
                        response[attId].date = new moment(response[attId].date);
                        this.files.push(response[attId]);
                    }
                }

                // set the count
                this.count = this.files.length;

                // broadcast the count
                this.broadcastAttachmentCount();

                this.loading = false;
                // this.files = response;

                // close the subject
                retSubject.next(this.files);
                retSubject.complete();

                this.loaded = true;

                // emit on the service
                this.loaded$.next(true);
            },
            error: error => {
                this.loading = false;

                // close the subject
                retSubject.error(error);
                retSubject.complete();
            }

        });

        return retSubject.asObservable();
    }

    /**
     * clones the attachments from another model
     *
     * @param parentModel
     * @param categoryId
     */
    public cloneAttachments(parentModel: model, categoryId?: string): Observable<any> {
        let retSubject = new Subject();
        this.backend.postRequest(`common/spiceattachments/module/${this.module}/${this.id}/clone/${parentModel.module}/${parentModel.id}`, {}, {categoryId}, this.httpRequestsRefID).subscribe({
            next: response => {
                for (let attId in response) {
                    if (!this.files.find(a => a.id == attId)) {
                        response[attId].date = new moment(response[attId].date);
                        this.files.push(response[attId]);
                    }
                }

                // set the count
                this.count = this.files.length;

                // broadcast the count
                this.broadcastAttachmentCount();

                // close the subject
                retSubject.next(this.files);
                retSubject.complete();
            },
            error: error => {
                this.loading = false;

                // close the subject
                retSubject.error(error);
                retSubject.complete();
            }

        });
        return retSubject.asObservable();
    }

    /**
     * returns the human readable file size fort the display
     *
     * @param filesize
     */
    public humanFileSize(filesize) {
        let thresh = 1024;
        let bytes: number = filesize;
        if (Math.abs(filesize) < thresh) {
            return bytes + " B";
        }
        let units = ["kB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
        let u = -1;
        do {
            bytes /= thresh;
            ++u;
        } while (Math.abs(bytes) >= thresh && u < units.length - 1);
        return bytes.toFixed(1) + " " + units[u];
    }

    /**
     * upload files from teh files passed back from a drop or a file select input
     *
     * @param files
     * @param systemCategoryId
     */
    public uploadAttachmentsBase64(files, systemCategoryId?: string): Observable<any> {
        if (files.length === 0) {
            return;
        }

        let retSub = new Subject<any>();
        let maxSize = this.configurationService.getSystemParamater('upload_maxsize');

        for (let file of files) {
            // check max filesize
            if (maxSize && file.size > maxSize) {
                this.toast.sendToast(this.language.getLabelFormatted('LBL_EXCEEDS_MAX_UPLOADFILESIZE', [file.name, this.humanFileSize(maxSize)]), 'error');
                continue;
            }

            let newfile = {
                date: new moment(),
                file: '',
                file_mime_type: file.type ? file.type : 'application/octet-stream',
                filesize: file.size,
                filename: file.name,
                category_ids: systemCategoryId,
                filemd5: undefined,
                id: '',
                text: '',
                thumbnail: '',
                user_id: '1',
                user_name: 'admin',
                uploadprogress: 0
            };
            this.files.unshift(newfile);

            // broadcast the count
            this.count++;
            this.broadcastAttachmentCount();

            this.readFile(file).subscribe(() => {
                this.uploadForUploadAttachmentsBase64(newfile, retSub, file);
            });

        }

        return retSub.asObservable();
    }

    /**
     * uploads  set of files based on an array with the files where the filecontent is the base64 encoded string
     *
     * @param files
     */
    public uploadAttachmentsBase64FromArray(files): Observable<any> {
        if (files.length === 0) {
            return;
        }

        let retSub = new Subject<any>();
        let maxSize = this.configurationService.getSystemParamater('upload_maxsize');

        for (let file of files) {
            // check max filesize
            if (maxSize && file.size > maxSize) {
                this.toast.sendToast(this.language.getLabelFormatted('LBL_EXCEEDS_MAX_UPLOADFILESIZE', [file.name, this.humanFileSize(maxSize)]), 'error');
                continue;
            }

            let newfile = {
                date: new moment(),
                file: '',
                file_mime_type: file.type ? file.type : 'application/octet-stream',
                filesize: file.size,
                filename: file.name,
                filemd5: undefined,
                id: '',
                text: '',
                thumbnail: '',
                user_id: '1',
                user_name: 'admin',
                uploadprogress: 0
            };
            this.files.unshift(newfile);

            // broadcast the count
            this.count++;
            this.broadcastAttachmentCount();

            this.uploadForUploadAttachmentsBase64(newfile, retSub, file);
        }

        return retSub.asObservable();
    }

    /**
     * upload part of "uploadAttachmentsBase64" function
     *
     * @param newfile
     * @param retSub
     * @param file
     */
    public uploadForUploadAttachmentsBase64(newfile, retSub, file) {


        let progressSubscription = new BehaviorSubject<number>(0);
        progressSubscription.subscribe(value => {
            newfile.uploadprogress = Math.floor(value);
            // retSub.next({progress: {total: e.total, loaded: e.loaded}});
        });

        let fileBody = {
            file: file.filecontent,
            filename: file.name,
            filemimetype: file.type ? file.type : 'application/octet-stream',
            category_ids: newfile.category_ids
        };

        // determine the upload URL
        // if we just upload or also link to a bean
        let url = 'common/spiceattachments';
        if (this.module && this.id) {
            url += `/module/${this.module}/${this.id}`;
        }

        this.backend.postRequestWithProgress(url, null, fileBody, progressSubscription, this.httpRequestsRefID).subscribe(retVal => {
                newfile.id = retVal[0].id;
                newfile.thumbnail = retVal[0].thumbnail;
                newfile.filemd5 = retVal[0].filemd5;
                newfile.user_id = retVal[0].user_id;
                newfile.user_name = retVal[0].user_name;
                delete (newfile.uploadprogress);

                retSub.next({files: retVal});
                retSub.complete();
            }
        );

    }

    /**
     * upload a file from  a base 64 string directly
     *
     * @param filecontent
     * @param filename
     * @param filetype
     */
    public uploadFileBase64(filecontent: string, filename: string, filetype: string): Observable<any> {

        let retSub = new Subject<any>();
        let maxSize = this.configurationService.getSystemParamater('upload_maxsize');

        // check max filesize
        if (maxSize && atob(filecontent).length > maxSize) {
            this.toast.sendToast(this.language.getLabelFormatted('LBL_EXCEEDS_MAX_UPLOADFILESIZE', [filename, this.humanFileSize(maxSize)]), 'error');
            return;
        }

        let newfile = {
            date: new moment(),
            file: '',
            file_mime_type: filetype ? filetype : 'application/octet-stream',
            filesize: atob(filecontent).length,
            filename: filename,
            filemd5: undefined,
            id: '',
            text: '',
            thumbnail: '',
            user_id: '1',
            user_name: 'admin',
            uploadprogress: 0
        };
        this.files.unshift(newfile);

        // broadcast the count
        this.count++;
        this.broadcastAttachmentCount();

        let progressSubscription = new BehaviorSubject<number>(0);
        progressSubscription.subscribe(value => {
            newfile.uploadprogress = Math.floor(value);
            // retSub.next({progress: {total: e.total, loaded: e.loaded}});
        });

        let fileBody = {
            file: filecontent,
            filename: filename,
            filemimetype: filetype ? filetype : 'application/octet-stream'
        };

        // determine the upload URL
        // if we just upload or also link to a bean
        let url = 'common/spiceattachments';
        if (this.module && this.id) {
            url += `/module/${this.module}/${this.id}`;
        }

        this.backend.postRequestWithProgress(url, null, fileBody, progressSubscription, this.httpRequestsRefID).subscribe(retVal => {
                newfile.id = retVal[0].id;
                newfile.thumbnail = retVal[0].thumbnail;
                newfile.filemd5 = retVal[0].filemd5;
                newfile.user_id = retVal[0].user_id;
                newfile.user_name = retVal[0].user_name;
                delete (newfile.uploadprogress);

                retSub.next({files: retVal});
                retSub.complete();
            }
        );

        return retSub.asObservable();
    }

    /**
     * loads the file locally using the HTML5 FileReader
     * @param file
     */
    public readFile(file): Observable<any> {
        let responseSubject = new Subject<any>();
        let reader: any = new FileReader();
        reader.file = file;
        reader.onloadend = (e) => {
            let filecontent = reader.result.toString();
            filecontent = filecontent.substring(filecontent.indexOf('base64,') + 7);

            let file = reader.file;
            file.filecontent = filecontent;
            responseSubject.next(file);
            responseSubject.complete();
        };
        reader.readAsDataURL(file);
        return responseSubject.asObservable();
    }


    /**
     * delete an attachment
     *
     * @param id
     */
    public deleteAttachment(id) {
        this.backend.deleteRequest(`common/spiceattachments/module/${this.module}/${this.id}/${id}`, null, this.httpRequestsRefID)
            .subscribe(res => {
                let index = this.files.findIndex(f => f.id == id);
                this.files.splice(index, 1);

                // broadcast the count
                this.count--;
                this.broadcastAttachmentCount();
            }, error => {
                this.toast.sendToast('Cannot delete attachment.', 'error', error.error.error.message, false);
            });
    }


    /**
     * doanloads an attachment int he local browser
     *
     * @param id
     * @param name
     */
    public downloadAttachment(id, name?) {
        this.backend.getRequest(`common/spiceattachments/module/${this.module}/${this.id}/${id}`, null, this.httpRequestsRefID).subscribe(fileData => {
            let blob = this.b64toBlob(fileData.file, fileData.file_mime_type);
            let blobUrl = URL.createObjectURL(blob);
            let a = document.createElement("a");
            document.body.appendChild(a);
            a.href = blobUrl;
            a.download = fileData.filename;
            a.type = fileData.file_mime_type;
            a.click();
            a.remove();
        });
    }


    /**
     * doanloads an attachment in he local browser that is retrived from a field on a bean
     *
     * @param id
     * @param name
     */
    public downloadAttachmentForField(module, id, field, name?) {
        this.backend.getRequest(`common/spiceattachments/module/${module}/${id}/byfield/${field}`, null, this.httpRequestsRefID).subscribe(fileData => {
            let blob = this.b64toBlob(fileData.file, fileData.file_mime_type);
            let blobUrl = URL.createObjectURL(blob);
            let a = document.createElement("a");
            document.body.appendChild(a);
            a.href = blobUrl;
            a.download = fileData.filename;
            a.type = fileData.file_mime_type;
            a.click();
            a.remove();
        });
    }


    /**
     * retrueves an attachment with a given id for a model
     * @param id
     */
    public getAttachment(id): Observable<any> {
        let retSubject = new Subject();

        this.backend.getRequest(`common/spiceattachments/module/${this.module}/${this.id}/${id}`, null, this.httpRequestsRefID).subscribe({
            next:
                fileData => {
                    retSubject.next(fileData.file);
                    retSubject.complete();
                },
            error: err => {
                retSubject.error(err);
                retSubject.complete();
            }
        });

        return retSubject.asObservable();
    }

    /**
     * helper to convert a base64 string to a BLOB the browser can use
     * @param b64Data
     * @param contentType
     * @param sliceSize
     */
    public b64toBlob(b64Data, contentType = '', sliceSize = 512) {

        let byteCharacters = atob(b64Data);
        let byteArrays = [];

        for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            let slice = byteCharacters.slice(offset, offset + sliceSize);

            let byteNumbers = new Array(slice.length);
            for (let i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }

            let byteArray = new Uint8Array(byteNumbers);

            byteArrays.push(byteArray);
        }

        let blob = new Blob(byteArrays, {type: contentType});
        return blob;
    }

    /**
     * opens the attachment
     *
     * @param id
     * @param name
     */
    public openAttachment(id, name?) {
        this.backend.getRequest(`common/spiceattachments/module/${this.module}/${this.id}/${id}`, null, this.httpRequestsRefID).subscribe(fileData => {
            let blob = this.b64toBlob(fileData.file, fileData.file_mime_type);
            let blobUrl = URL.createObjectURL(blob);
            window.open(blobUrl, "_blank");
        });
    }

    public ngOnDestroy() {
        this.backend.cancelPendingRequests([this.httpRequestsRefID]);
    }
}
