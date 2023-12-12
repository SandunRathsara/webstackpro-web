export type MapKeysToString<BaseType> = {
  [Key in keyof BaseType]: string;
};

export type UppercaseKeys<BaseType> = {
  [Key in keyof BaseType as Uppercase<string & Key>]: BaseType[Key];
};
