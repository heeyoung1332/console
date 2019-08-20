import { hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import { GlobalEnum } from '@/setup/enum';
import VueLodash from 'vue-lodash';
import timezone from 'countries-and-timezones';
export const Mixin = {
    methods: {
    /**********************************************************************************
     * Name       : getGraphColor
     * Input      : => (o: opacity,   => Boolean,
     *                  r: random,    => Boolean,
     *                  l: length     => Number)
     * Output     : => (String || Array of String contains Hex color)
     * Description:    generate random color HEX digits.
     **********************************************************************************/
        getGraphColor: (o, r, l) => {
            const colorListWithOpacity = [
                hexToRgba('#2C68F9', 70),
                hexToRgba('#e81d2a', 70),
                hexToRgba('#8a2be2', 70),
                hexToRgba('#1a1f3e', 70),
                hexToRgba('#0F2965', 70),
                hexToRgba('#4856f2', 70),
                hexToRgba('#FFAE08', 70),
                hexToRgba('#2D9E6E', 70)
            ];
            const colorListWithOutOpacity = ['#2C68F9', '#e81d2a', '#8a2be2', '#1a1f3e', '#4856f2', '#FFAE08', '#2D9E6E' ];

            let selectedColor = (o) ? colorListWithOpacity: colorListWithOutOpacity;
            let returnColorVal =  l == 0 ? (r) ? selectedColor[Math.floor(Math.random() * selectedColor.length)] : selectedColor[0]: [];
            let idx = 0;

            for (let i = 0; i < l; i++) {
                if (r) {
                    returnColorVal.push(selectedColor[Math.floor(Math.random() * selectedColor.length)]);
                } else {
                    idx = i >= selectedColor.length ? l%selectedColor.length : i;
                    returnColorVal.push(selectedColor[idx]);
                }
            }
            return returnColorVal;
        },
    /**********************************************************************************
     * Input        => (v:value: => Any)
     * Output       => (Boolean)
     * Description:    Check whether given value is empty.
     **********************************************************************************/
        isEmpty: function (v) {
            return (v === '' || v === null || v === undefined || (v !== null && typeof v === 'object' && !Object.keys(v).length)) ? true : false;
        },
    /**********************************************************************************
     * Name       : cssStyler
     * Input        => (c:css Object      => type of Object,
     *                  i:use 'Style' YN  => Boolean
     *                  t:use  Trim   YN  => Boolean )
     * Output       => (String): All trimmed css String by condition;
     * Description:    Generate full String of css given Object c by condition of i, t
     **********************************************************************************/
        cssStyler: function (c, i, t) {
            let style = '';
            Object.entries(c).forEach(([key, val]) => {
                if (t) {
                    return style += key.trim() + ':' + val.trim() + (val.indexOf(';') > 0) ? '' : ';';
                } else {
                    return style += key + ':' + val + ';';
                }
            });
            return (i) ? `style="${style}"` : style;
        },
    /**********************************************************************************
     * Name       : selectToCopyToClipboard
     * Input   => (t:text            =>  String)
     * Output  => (Empty):
     * Description:  copy given text to clipboard
     **********************************************************************************/
        selectToCopyToClipboard: function (t) {
            let textArea = document.createElement('textarea');
            textArea.value = t;
            document.body.appendChild(textArea);
            textArea.select();
            let successFailCondition = document.execCommand('Copy');
            textArea.remove();
            console.log('Success', successFailCondition);
        },
    /**********************************************************************************
     * Name       : sideBarMiniMaxControl
     * Input   => ()
     * Output  => (Empty):
     * Description:  Minimize or Maximize Side bar Menu
     **********************************************************************************/
        sideBarMiniMaxControl: function () {
            let currentStatus = document.body.className;
            if (currentStatus.indexOf('sidebar-minimized brand-minimized') > -1) {
                document.body.className = 'sidebar-lg-show header-fixed sidebar-fixed';
            } else {
                document.body.className = 'sidebar-lg-show header-fixed sidebar-fixed sidebar-minimized brand-minimized';
            }
        },
    /**********************************************************************************
     * Name       : selectBadges
     * Input   => (s:badges flag String  => String)
     * Output  => (String): variant value
     * Description:  Select badges variant by given val
     **********************************************************************************/
        selectBadges: function (s) {
            const successFlag = ['active', 'success','vm'];
            const secondaryFlag = ['inactive'];
            const dangerFlag = ['banned', 'failure', 'fail'];
            const warningFlag = ['pending','aws'];
            const infoFlag = [];
            const lightFlag = [];
            const darkFlag = [];
            return successFlag.includes(s.toLowerCase()) ? 'success'
                : secondaryFlag.includes(s.toLowerCase()) ? 'secondary'
                : dangerFlag.includes(s.toLowerCase()) ? 'danger'
                : warningFlag.includes(s.toLowerCase()) ? 'warning'
                : infoFlag.includes(s.toLowerCase()) ? 'info'
                : lightFlag.includes(s.toLowerCase()) ? 'light'
                : darkFlag.includes(s.toLowerCase()) ? 'dark'
                : 'primary';
        },
    /**********************************************************************************
     * Name       : capitalize
     * Input   => (s: any String   => String)
     * Output  => (String): with upper case of First letter
     * Description:  Select badges variant by given val
     **********************************************************************************/
        capitalize: (s) => {
            if (typeof s !== 'string') {
                return '';
            }
            return s.charAt(0).toUpperCase() + s.slice(1);
        },
    /**********************************************************************************
     * Name       : consoleLogEnv
     * Input   => (s: any String   => String)
     *             o: any object   => Object)
     * Output  => print out on console.log
     * Description:  Console.log if only when it's not in production.
     **********************************************************************************/
        consoleLogEnv: function (s, o) {
            const processEnv = this.$root.$options.components.App.props.processEnv.default;
            if (!this.isEmpty(processEnv) && processEnv != 'production') {
                if (!this.isEmpty(o)) {
                    console.log(s, o);
                } else {
                    console.log(s);
                }
            }
        },
    /**********************************************************************************
     * Name       : colSelector
     * Input   => (l: length of data   => Number)
     * Output  => (String): with First letter
     * Description:  return String with selected col size
     **********************************************************************************/
        colSelector: function (l) {
            const colNumber = Math.round(12 / l);
            return 'col-xs-6 col-sm-6 col-md-6 col-lg-' + colNumber + ' col';
        },
    /**********************************************************************************
     * Name       : isSelectedType
     * Input   => (t: type to check  =>  n: Number, s:String, b:Boolean, o:Object, a:Arr
     *             d: data to check  => Any)
     * Output  => boolean whether it's checked type
     * Description:  Console.log if only when it's not in production.
     **********************************************************************************/
        isSelectedType: function (d, t) {
            if (t.toUpperCase() ==='N') {
                return (Number.isInteger(d) && !isNaN(d));
            } else if (t.toUpperCase() ==='D' || t.toUpperCase() ==='F') {
                return (!isNaN(parseFloat(d)));
            } else if (t.toUpperCase() ==='B') {
                return  ['1', '0', 1, 0, true, false].includes(d);
            } else if (t.toUpperCase() ==='S') {
                return  (typeof d === 'string' || d instanceof String);
            } else if (t.toUpperCase() ==='O') {
                return (typeof d === 'object' && d !== null && !Array.isArray(d));
            } else if (t.toUpperCase() ==='A') {
                return Array.isArray(d);
            } else {
                throw 'Please, Check data type';
            }
        },
    /**********************************************************************************
     * Name       : selectIconHtml
     * Input   => (o: icon object   =>  Object, c: class)
     *            {type: type of font awesome ex: fal, fab,
     *             icon: icon name,
     *             size: size of icon ex: -1 ~ 10
     *             color: variant color
     *            }
     * Output  => boolean whether it's checked type
     * Description:  Create a string of <i/> Dom tag with given option
     **********************************************************************************/
        selectIconHtml: function (o, c) {
             /******************************************************************
             * Note:: Please add a new type letter when New font Type has added.
             * ****************************************************************
             */
            const fontAwesome = ['l','b','d','s'];
            let returnHtml = '';
            let defaultClass = 'fal ';
            if (o.hasOwnProperty('type') && fontAwesome.includes(o.type)) {
                defaultClass = 'fa' + o.type + ' ';
            }
            if (o.hasOwnProperty('icon')) {
                defaultClass += o.icon;
            } else {
                defaultClass += 'fa-hashtag';
            }
            if (o.hasOwnProperty('size') && o.size > -2 && o.size <= 10) {
                if (o.size === -1){
                    defaultClass += ' fa-xs';
                } else if (o.size === 0){
                    defaultClass += ' fa-sm';
                } else if (o.size === 1){
                    defaultClass += ' fa-lg';
                } else {
                    defaultClass += ' fa-'+ o.size +'x';
                }
            }
            if (o.hasOwnProperty('color')) {
                defaultClass += ' ' + o.color;
            }
            returnHtml =`<i class="${defaultClass}"> </i>`;
            return c ? defaultClass : returnHtml;
        },
    /**********************************************************************************
     * Name       : tr
     * Input   => (m: message   =>  String)
     *            {type: type of font awesome ex: fal, fab,
     *             icon: icon name,
     *             size: size of icon ex: -1 ~ 10
     *             color: variant color
     *            }
     * Output  => String translation Message
     * Description:  translation of i18n
     **********************************************************************************/
        tr: function (m) {
            let path = m.split('.');
            let key = 'MSG';
            if (path[0] !== 'MSG' && path.length < 2) {
                key += '.'+m;
            } else {
                key = m;
            }
            return  this.$i18n.t(key);
        },
    /**********************************************************************************
     * Name       : setFontSize
     * Input   => (m: message   =>  String)
     *            {type: type of font awesome ex: fal, fab,
     *             icon: icon name,
     *             size: size of icon ex: -1 ~ 10
     *             color: variant color
     *            }
     * Output  => String translation Message
     * Description:  return string with font-size with for h1,h2,h3,h4,h5,h6 and personal set data.
     **********************************************************************************/
        setFontSize: function (f) {
            let fontSize = 'font-size:';
            let defaultSet = this.defaultFontSizeSet;
            let length = defaultSet.length;
            if (this.isSelectedType(f,'s') && f.include('px')) {
                fontSize += f;
            } else if ( f > 0 && f < 7 ) {
                fontSize += defaultSet[length-f] + 'px';
            } else {
                fontSize += defaultSet[length-3] + 'px';
            }
            return fontSize;
        },
        /**********************************************************************************
         * Name       : bindEnumToHtml
         * Input   => (m: message   =>  String)
         *            {type: type of font awesome ex: fal, fab,
         *             icon: icon name,
         *             size: size of icon ex: -1 ~ 10
         *             color: variant color
         *            }
         * Output  => String translation Message
         * Description:  translation of i18n
         **********************************************************************************/
        bindEnumToHtml: function (p) {
            if (!this.isEmpty(this._.get(GlobalEnum,p.toUpperCase()))) {
                const icon = this._.get(GlobalEnum,p.toUpperCase() + '.icon');
                const color = this._.get(GlobalEnum,p.toUpperCase() + '.color');
                const msg = this.isEmpty(this.tr('ENUM.' + p.toUpperCase())) ? this._.get(GlobalEnum,p.toUpperCase() +  '.msg') : this.tr('ENUM.' + p.toUpperCase());

                /***********
                msg: 'In Progress',
                icon: 'fal fa-check',
                color: 'primary'
                ************/

                return `<span class="${color}"><i class="${icon}"> </i></span> &nbsp; ${msg}`;

            } else {
                return '';
            }
        },
        /**********************************************************************************
         * Name       : bindAdditionalKey
         * Input   => (t: data                         =>  Array of data Object
         *             k: key                          =>  String
         *             v: additional value to attach   =>  String
         *             l: location  =>  where to bind additional key at (b: back, or rest default: front)
         * Output  => String translation Message
         * Description:  translation of i18n
         **********************************************************************************/
        bindAdditionalKey: function (d, k, i, l) {
            let returnVal = d;
            if (this.isSelectedType(d,'a')){
                for (let current of returnVal) {
                    current[k] = (l === 'b') ? current[k] =   current[k] + '.' + i : current[k] = i +  '.' + current[k];
                }
            } else {
                returnVal = (l === 'b') ? returnVal =   returnVal + '.' + i : returnVal = i + '.' +  returnVal;
            }
            return returnVal;
        },
        /**********************************************************************************
         * Name       : dictToKeyValueArray
         * Input   => (t: data                         =>  Array of data Object
         *             k: key                          =>  String
         *             v: additional value to attach   =>  String
         *             l: location  =>  where to bind additional key at (b: back, or rest default: front)
         * Output  => String translation Message
         * Description:  translation of i18n
         **********************************************************************************/
        dictToKeyValueArray: function (obj) {
            let arr = [];
            for (var key in obj) {
                arr.push({ [key]: obj[key] });
            }
            return arr;
        },
        /**********************************************************************************
         * Name       : treeDataHandler
         * Input   => (d: data                         =>  Array of data Object
         *             t: Type                         =>  Tree Type in Enum values)
         * Output  => Object Array which
         * Description:  return tree array of object which suits for BaseTree
         **********************************************************************************/
        treeDataHandler: function (d, t) {
            let returnTree = [];
            let treeKey = this.isEmpty(t) ? 'TREE': 'TREE.'+ t;

            if (d.hasOwnProperty('items') && d.items.length > 0) {
                d.items.forEach((curItem) =>{
                    let obj = {};
                    console.log(curItem);
                    obj['data'] = {
                        id: curItem.id,
                        item_type : curItem.item_type
                    };
                    obj['title'] = curItem.name;
                    obj['isLeaf'] = this._.get(GlobalEnum,`${treeKey}.${curItem.item_type}.isLeaf`);
                    obj['isExpanded'] = false;
                    if (curItem.has_child){
                        obj['children'] = [];
                    }
                    returnTree.push(obj);
                });
            } else {
                returnTree =  [{ title: 'Please, Right Click me',
                    isLeaf: true,
                    data: {
                        init: true
                    }}];
            }

            return returnTree;
        },
        /**********************************************************************************
         * Name       : getAllTimezones
         *             
         * Output  => Array
         * Description:  return Array of timezone String.
         **********************************************************************************/
        getAllTimezones: function () {
            return Object.keys(timezone.getAllTimezones());
        },
        /**********************************************************************************
         * Name       : getSelectedNode
         * Input   => (f: flag                         =>  String)
         * Output  => Node
         * Description:  return tree array of object which suits for BaseTree
         **********************************************************************************/
        getSelectedNode: function () {
            let selectedNode = {
                title: '',
                isLeaf: false,
                children: null,
                isExpanded: false,
                isSelected: true,
                isDraggable: true,
                isSelectable: true,
                data: { visible: false }
            };

            return selectedNode;
        }
    },
    data: function () {
        return {
            globalProp: null,
            _: VueLodash,
            defaultFontSizeSet: [10, 12, 14, 16, 18, 24],
            isFirstLogin: false
        };
    }
};

