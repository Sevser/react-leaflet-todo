import { IPoint } from "./IPoint";

export class Point implements IPoint {
    public lat: number;
    public lng: number;
    constructor(props?: IPoint) {
        if (props) {
            this.lat = props.lat;
            this.lng = props.lng;
        } else {
            this.lat = 0;
            this.lng = 0;
        }
    }
}