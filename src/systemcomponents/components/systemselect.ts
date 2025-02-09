/**
 * @module SystemComponents
 */
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    forwardRef,
    Input,
    Renderer2,
    SimpleChanges,
    ViewChild,
    ViewContainerRef
} from "@angular/core";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";

/**
 * @ignore
 */
declare var _;

@Component({
    selector: "system-select",
    templateUrl: "../templates/systemselect.html",
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => SystemSelect),
        multi: true
    }]
})
export class SystemSelect implements ControlValueAccessor {
    /**
     * the input list to be displayed
     */
    @Input() public selectList: { id: string, name: string, group?: string }[] = [];
    /**
     * label of the form element
     */
    @Input() public label: string = "";
    /**
     * holds the input value
     */
    public value: string;
    /**
     * holds the defined list height by slds style
     */
    @Input() public listHeight: '10' | '7' | '5' = '7';
    /**
     * holds the disabled boolean
     */
    @Input() public disabled: boolean = false;
    /**
     * emit the input value on enter press
     */
    @Input() public emitInputValueOnEnterPress: boolean = false;
    /**
     * holds the search list results
     */
    public searchList: { id: string, name: string, content: string, group?: string }[] | any = {};
    /**
     * holds a boolean to show/hide the results list
     */
    public searchListVisible: boolean = false;
    /**
     * holds the focused dom item data
     */
    public focusedItemId: string;
    /**
     * change emitter by ngModel
     * @private
     */
    public onChange: (value: { id: string, name: string, group?: string } | string) => void;
    /**
     * reference to the result list ul element
     * @private
     */
    @ViewChild('resultList', {read: ViewContainerRef}) public resultListContainer: ViewContainerRef;

    constructor(public elementRef: ElementRef,
                public cdRef: ChangeDetectorRef,
                public renderer: Renderer2) {
    }

    /**
     * @return string dropdown length style
     */
    get dropdownLength() {
        return `calc(((1rem * 1.5) + 1rem) * ${this.listHeight})`;
    }

    /**
     * Set the function to be called
     * when the control receives a change event.
     *
     * @param fn a function
     */
    public registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    /**
     * Set the function to be called
     * when the control receives a touch event.
     *
     * @param fn a function
     */
    public registerOnTouched(fn: any): void {
        return;
    }

    /**
     * Write a new value to the element.
     * @param value
     */
    public writeValue(value: { id: string, name: string, group?: string }) {
        if (!value) return;
        this.value = value.name;
        this.focusedItemId = value.id;
        this.cdRef.detectChanges();
    }

    /**
     * generate search list
     */
    public ngOnChanges(changes: SimpleChanges) {
        if (changes.selectList) {
            this.searchList = this.generateSearchList();
        }
    }

    /**
     * handle the click outside the search box
     * @param event
     */
    public outsideClickHandler(event: MouseEvent): void {

        const clickedInside = this.elementRef.nativeElement.contains(event.target);
        if (!clickedInside) {
            this.hideSearchList();
        }
    }

    /**
     * handle the key up
     * @param event
     */
    public onKeyup(event: KeyboardEvent) {

        switch (event.key) {
            case 'ArrowUp':
            case 'ArrowDown':
                return this.navigateThroughResultList(event);
            case 'Enter':
                this.handleEnterPress();
                break;
            default:
                this.filterSearchList();
                break;
        }

        if (this.searchList.length == 0 || event.key == 'Enter') {

            this.hideSearchList();
        }

        this.cdRef.detectChanges();
    }

    /**
     * handle input focus and show the search list
     */
    public onFocus() {

        this.searchListVisible = true;

    }

    /**
     * handle input blur the hide the result list
     */
    public onBlur(event: FocusEvent) {
        this.hideSearchList();
    }

    /**
     * handle input click to open the list
     * @param event
     */
    public onInputClick(event: MouseEvent) {

        if (!this.searchListVisible) {
            this.searchList = this.generateSearchList();
        }

        this.searchListVisible = true;
        event.stopPropagation();
    }

    /**
     * handle result list item click
     * @param item
     * @param event
     * @private
     */
    public itemClicked(item, event) {

        this.hideSearchList();

        this.selectList.some((listItem) => {
            if (listItem.id == item.id) {
                this.onChange(listItem);
                this.value = listItem.name;
                this.focusedItemId = listItem.id;
                return true;
            }
        });

        if (event.stopPropagation) event.stopPropagation();
    }

    /**
     * hide the search list and destroy the outside click listener
     */
    public hideSearchList() {
        this.searchListVisible = false;
        this.cdRef.detectChanges();
    }

    /**
     * highlight the selected list items in the dom
     * @private
     */
    public filterSearchList() {

        this.searchListVisible = true;
        this.focusedItemId = undefined;

        this.searchList = this.generateSearchList();

        if (!this.value || this.searchList.length == 0) return;

        this.searchList = this.searchList.filter(e => e.name.toLowerCase().indexOf(this.value.toLowerCase()) > -1);

        this.searchList.forEach(e => {

            const position = e.name.toLowerCase().indexOf(this.value.toLowerCase());

            if (position == -1) return;

            e.content = this.generateHighlightHTMLContent(e.name, position);
        });
    }

    /**
     * generate html marked match chars
     * @param text
     * @param position
     * @private
     */
    public generateHighlightHTMLContent(text: string, position: number) {
        return [text.slice(0, position), "<mark>", text.slice(position, position + this.value.length), "</mark>", text.slice(position + this.value.length)].join('');
    }

    /**
     * handle the enter key press to emit the change
     * @private
     */
    public handleEnterPress() {
        if (!!this.focusedItemId) {
            this.onChange(
                this.selectList.find(e => e.id == this.focusedItemId)
            );
        } else if (this.emitInputValueOnEnterPress) {
            this.onChange(this.value);
        }
    }

    /**
     * generate search list
     * @return array of the search list
     * @private
     */
    public generateSearchList(): { id: string, name: string, group?: string }[] {

        const searchList = [];
        const groups = _.uniq(this.selectList.map(e => e.group)).sort();

        groups.forEach((g) => {

                if (!!g || (!g && groups.length > 1)) {
                    searchList.push(
                        {id: `${g}`, name: `${g}`, isGroup: true}
                    );
                }

                this.selectList.filter(e => e.group == g)
                    .sort((a, b) => a.name > b.name ? 1 : -1)
                    .forEach((e) =>
                        searchList.push({...e, content: e.name})
                    );
            }
        );

        return searchList;
    }

    /**
     * navigate through the result list by arrow key press
     * @param event
     * @private
     */
    public navigateThroughResultList(event: KeyboardEvent) {

        let list = !this.searchListVisible ? this.generateSearchList() : this.searchList;
        list = list.filter(e => !e.isGroup);

        if (list.length == 0) {
            return;
        }

        const direction = event.key == 'ArrowDown' ? 'down' : 'up';
        const currentIndex = !this.focusedItemId ? 0 : list.findIndex(e => e.id == this.focusedItemId);
        let nextItem = direction == 'down' ? list[currentIndex + 1] : list[currentIndex - 1];

        if (!this.focusedItemId || !nextItem) {
            nextItem = list[0];
            this.focusedItemId = nextItem.id;
            this.value = nextItem.name;

        } else if (!!nextItem) {

            this.focusedItemId = nextItem.id;
            this.value = nextItem.name;
        }

        if (!this.searchListVisible && !!nextItem) {
            this.onChange(nextItem);
        }

        this.scrollToFocusedSearchItem(direction);
    }

    /**
     * scroll to the focused search list item in the dom
     * @param direction
     * @private
     */
    public scrollToFocusedSearchItem(direction: 'up' | 'down') {

        if (!this.resultListContainer) return;

        const listHTMLElements: HTMLElement[] = Array.from(this.resultListContainer.element.nativeElement.children)
            .filter((e: HTMLElement) => !e.hasAttribute('data-is-group')) as HTMLElement[];

        let focusedHTMLElementIndex = listHTMLElements.findIndex((e: HTMLElement) => e.firstElementChild.classList.contains('slds-has-focus'));

        if (((focusedHTMLElementIndex + 1) == listHTMLElements.length && direction == 'down') || (focusedHTMLElementIndex == 0 && direction == 'up')) {
            focusedHTMLElementIndex = 0;
        } else {
            focusedHTMLElementIndex = direction == 'down' ? focusedHTMLElementIndex + 1 : focusedHTMLElementIndex - 1;
        }

        listHTMLElements[focusedHTMLElementIndex].scrollIntoView();
    }
}
