type TodoObject = { id: number; text: string; status: string }[];
type TodoType ={id: number; text: string; status: string };
type StatusFunc= ({
    id: number;
    text: string;
    status: string;
} | {
    status: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    id: number;
    text: string;
})[]


export type{TodoObject,TodoType,StatusFunc};