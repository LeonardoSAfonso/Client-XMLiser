export default interface IFilteredClientDTO {
  ['city' | 'gender' | 'kind']: string;
  sumSalaries: number;
  totalElements: number;
}
