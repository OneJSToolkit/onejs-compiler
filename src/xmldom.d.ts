declare module 'xmldom' {

    interface IDOMParserStatic {
        new(): IDOMParser;
    }

    interface IDOMParser {
        parseFromString(content: string);
    }

    export
    var DOMParser: IDOMParserStatic;
}