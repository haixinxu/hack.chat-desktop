(function ($) {
    $.fn.autocomplete = function (method?: string, value?: any) {
        let that: JQuery = this;
        if (this[0].nodeName !== "TEXTAREA" && this[0].nodeName !== "INPUT") {
            throw "autocomplete has to be applied to a <textarea> or <input> element";
        }
        if (arguments.length === 0) {
            if (this.data("autocomplete")) {
                throw "autocomplete has already been applied to the element";
            }
            this.data("autocomplete", true);
            this.data("items", []);
            let originalString = "";
            let startPos = 0;
            let endPos = 0;
            let nextIndex = 0;
            let possibleItems = [];
            this.keyup(function (e) {
                if (e.keyCode !== 9 && e.target.value !== originalString) {
                    let beforeWordReg = /(^|\s|@)[\w]*$/ig;
                    let match: RegExpExecArray;
                    let wordBeginning: number;// = that.data("startPos");
                    let items: string[] = that.data("items");
                    possibleItems = items;
                    if (e.target.value.substr(0, e.target.selectionEnd).length > 0) {
                        while ((match = beforeWordReg.exec(e.target.value.substr(0, e.target.selectionEnd))) !== null) {
                            wordBeginning = match.index;
                        }
                        match = /[\w]+/i.exec(e.target.value.substr(wordBeginning, e.target.value.length - wordBeginning));
                        if (match !== null) {
                            wordBeginning += match.index;
                            endPos = wordBeginning + match[0].length;
                        } else {
                            endPos = ++wordBeginning;
                        }
                    } else {
                        wordBeginning = 0;
                        endPos = 0;
                    }
                    startPos = wordBeginning;
                    if (match !== undefined && match !== null) {
                        possibleItems = items.filter(function (item) {
                            return match.length > 0 && item.startsWith(match[0]);
                        });
                    }
                    nextIndex = 0;
                    originalString = e.target.value;
                }
            }).keydown(function (e) {
                if (e.keyCode === 9) {
                    e.preventDefault();
                    let items = possibleItems || that.data("items");
                    if (items.length > 0) {
                        let currentIndex = nextIndex;
                        let strBefore = originalString.substr(0, startPos);
                        let strAfter = originalString.substr(endPos + 1);
                        e.target.value = strBefore + items[currentIndex] + " " + strAfter;
                        if (currentIndex === items.length - 1) {
                            currentIndex = -1;
                        }
                        nextIndex = currentIndex + 1;
                    }
                }
            });
        } else {
            if (!this.data("autocomplete")) {
                this.autocomplete();
            }
            let items: string[];
            switch (method) {
                case "addItem":
                    let newItem = value;
                    items = this.data("items");
                    items.push(newItem);
                    this.data("items", items);
                    break;
                case "removeItem":
                    let oldItem = value;
                    items = this.data("items");
                    let index = items.indexOf(oldItem);
                    items.splice(index, 1);
                    this.data("items", items);
                    break;
                case "setItems":
                    items = value;
                    this.data("items", items);
                    break;
            }
        }
        return this;
    };
})(jQuery);