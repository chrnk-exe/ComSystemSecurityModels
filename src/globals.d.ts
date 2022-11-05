declare module '*.sass';

declare interface IObject {
	id: number;
	name: string;
}

declare interface ISubject {
	id: number;
	name: string;
	rules: Rules[];
}


declare interface Data {
    Objects: IObject[];
    Subjects: ISubject[];
}

type Rules = [boolean, boolean];

declare type Rule = number[];
