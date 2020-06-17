export interface ISerializable {
  toJSON: () => any;
  fromJSON: (json: any) => void;
}
export abstract class Serializable {

abstract toJSON(): any;

abstract fromJSON(obj: any): any;

}
