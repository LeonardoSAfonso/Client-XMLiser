export default interface IUpdateClientDTO {
  name: string;
  cpf: string;
  marital_status: number;
  father?: string;
  mother?: string;
  partner?: string;
  rg: string;
  salary: number;
  kind: string;
  electoral_card: string;
  gender: string;
  cellphone?: string;
  zipcode: string;
  street: string;
  number: string;
  complement?: string;
  district: string;
  city: string;
  email: string;
  birthday: Date;
}
