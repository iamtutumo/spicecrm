/**
 * @module WorkbenchModule
 */
import {Component, EventEmitter, Input, Output} from '@angular/core';
import {language} from '../../services/language.service';
import {backend} from '../../services/backend.service';
import {toast} from '../../services/toast.service';
import {libloader} from '../../services/libloader.service';

declare var html_beautify: any;
declare var js_beautify: any;
declare var _: any;

/**
 * a modal to dsiplay an API Log entry record
 */
@Component({
    templateUrl: '../templates/apilogviewermodal.html',
})
export class APIlogViewerModal {

    /**
     * reference to itself for closing the modal
     * @private
     */
    public self;

    /**
     * the entry
     * @private
     */
    @Input() public entry: any;

    public record: any = {};

    /**
     * the request headers
     *
     * @private
     */
    public _requestheaders: any = {};

    /**
     * the response headers
     *
     * @private
     */
    public _responseheaders: any = {};

    /**
     * indicates we are loading
     *
     * @private
     */
    public isLoading = true;

    /**
     * the currently selected logtable
     */
    public logtable: string = 'sysapilog';

    /**
     * set to true if we foudn the proper beautify lib and loaded it
     */
    public beautifyenabled: boolean = false;

    /**
     * the active tab in the tabbed view
     */
    public activeTab: 'record' | 'headers' | 'post' | 'response' = 'record';

    constructor(public language: language, public backend: backend, public toast: toast, public libloader: libloader) {
        this.libloader.loadLib('jsbeautify').subscribe(loaded => {
            this.beautifyenabled = true;
        });
    }

    public ngOnInit() {
        this.loadFullData();
    }

    /**
     * Load the full data (with the un-truncated log text) and merge the full text to the record got from parent component.
     *
     * @private
     */
    public loadFullData() {
        this.isLoading = true;
        this.backend.getRequest(`admin/apilog/${this.entry.id}`, {logtable: this.logtable}).subscribe({
            next: (response) => {
                this.isLoading = false;
                this.record = response;

                // try to parse the headers so we know how to handle post and response params
                this.setRequestHeaders();
                this.setResponseHeaders();
            },
            error: (error) => {
                this.toast.sendToast('Error loading entry of log file!', 'error', 'Entry ' + this.entry.id + ' of REST log couldn´t be fetched.', false);
                this.isLoading = false;
                this.close();
            }
        });
    }

    /**
     * try to set the request header
     *
     * @private
     */
    public setRequestHeaders() {
        try {
            let headers = JSON.parse(this.record.request_headers);
            if (headers) {
                this._requestheaders = headers;
            }

        } catch (e) {
            this._requestheaders = {};
        }
    }

    /**
     * try to set the response header
     *
     * @private
     */
    public setResponseHeaders() {
        try {
            let headers = JSON.parse(this.record.response_headers);
            if (headers) {
                this._responseheaders = headers;
            }

        } catch (e) {
            this._responseheaders = {};
        }
    }

    /**
     * returns the parsed request headers as table
     */
    get requestHeaders() {
        if (this.record.request_headers) {
            try {
                let retArray = [];
                let headers = JSON.parse(this.record.request_headers);
                for (let entry in headers) {
                    retArray.push({
                        name: entry,
                        value: headers[entry]
                    });
                }
                return retArray;
            } catch (e) {
                return [];
            }
        }
        return [];
    }

    /**
     * returns the parsed response headers as table
     */
    get responseHeaders() {
        if (this.record.response_headers) {
            try {
                let retArray = [];
                let headers = JSON.parse(this.record.response_headers);
                for (let entry in headers) {
                    retArray.push({
                        name: entry,
                        value: headers[entry]
                    });
                }
                return retArray;
            } catch (e) {
                return [];
            }
        }
        return [];
    }

    /**
     * returns the parsed request headers as table
     */
    get requestArguments() {
        if (this.record.request_args) {
            try {
                let retArray = [];
                let args = JSON.parse(this.record.request_args);
                for (let arg in args) {
                    retArray.push({
                        name: arg,
                        value: args[arg]
                    });
                }
                return retArray;
            } catch (e) {
                return [];
            }
        }
        return [];
    }

    /**
     * returns the parsed request Paramaters
     */
    get requestParams() {
        if (this.record.request_params) {
            try {
                let retArray = [];
                let params = JSON.parse(this.record.request_params);
                for (let param in params) {
                    retArray.push({
                        name: param,
                        value: params[param]
                    });
                }
                return retArray;
            } catch (e) {
                return [];
            }
        }
        return [];
    }

    /**
     * retruns if we have a non empty request
     */
    get hasRequest() {
        return this.record.request_body && this.record.request_body != "{}";
    }

    /**
     * retruns if we have a non empty response
     */
    get hasResponse() {
        return this.record.response_body && this.record.response_body != "{}";
    }

    // Close the modal.
    public close() {
        this.self.destroy();
    }

    public determineContentType(headers: any) {
        let ct = 'application/json';
        for (let h in headers) {
            if (h.toLowerCase() == 'content-type') {
                let ctf = _.isArray(headers[h]) ? headers[h][0].toLowerCase().trim() : headers[h].toLowerCase().trim();
                let cta = ctf.split(';');
                ct = cta[0].trim();
                break;
            }
        }
        return ct;
    }

    public formattedResponse() {
        return this.getFormattedBody(this.determineContentType(this._responseheaders), this.record.response_body);
    }

    public formattedRequest() {
        return this.getFormattedBody(this.determineContentType(this._requestheaders), this.record.request_body);
    }

    public getFormattedBody(contentType, content) {
        switch (contentType) {
            case 'application/json':
                return JSON.stringify(JSON.parse(content), null, '\t');
                break;
            case 'application/x-ndjson':
                let res = [];
                let cItems = content.split('\n');
                for(let cItem of cItems) {
                    if(cItem) {
                        res.push(JSON.stringify(JSON.parse(cItem), null, '\t'));
                    }
                }
                return res.join('\r\n\r\n');
                break;
            case 'application/x-www-form-urlencoded':
                let cArray = [];
                let ca = content.split('&');
                for (let ce of ca) {
                    let c = ce.split('=');
                    cArray.push({
                        name: c[0],
                        value: decodeURIComponent(c[1].replaceAll('+', ' '))
                    });
                }
                return cArray;
            case 'text/xml':
            case 'application/xml':
                return html_beautify(content, {
                    indent_size: 4,
                    indent_char: " ",
                    indent_with_tabs: false,
                    end_with_newline: false,
                    indent_level: 0,
                    preserve_newlines: true,
                    max_preserve_newlines: 10,
                    space_in_paren: false,
                    space_in_empty_paren: false,
                    unindent_chained_methods: false,
                    break_chained_methods: false,
                    keep_array_indentation: false,
                    unescape_strings: false,
                    wrap_line_length: 100,
                    e4x: false,
                    comma_first: false,
                    operator_position: "before-newline",
                    indent_empty_lines: false,
                    templating: ["auto"]
                });
                break;
            default:
                return content;
        }
    }

    /**
     * get the headers formatted
     */
    public formatted(param) {
        try {
            return JSON.stringify(JSON.parse(this.record[param]), null, '\t');
        } catch (e) {
            return this.record[param];
        }
    }
}
