import { WordNTrans } from "./word-n-trans";

export class VocFile {

    isEnabledForGame:boolean=true;

    constructor(public name:string, public wordNTransList:Array<WordNTrans>) {}

    enable():void {
      this.isEnabledForGame=true;
    }
    disable():void {
      this.isEnabledForGame=false;
    }

}
