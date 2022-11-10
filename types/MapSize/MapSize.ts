import { IMapSize } from "./IMapSize";

export class MapSize implements IMapSize {
    width: number;
    height: number;
    constructor(props?: IMapSize) {
        if (props) {
            this.height = props.height;
            this.width = props.width;
        } else {
            this.height = NaN;
            this.width = NaN;
        }
    }

    get sizeAsStyle() {
        return {
            height: `${this.height}px`,
            width: `${this.width}px`,
        }
    }
}