import DynamicForm from './components/DynamicForm';
import loginForm from './assets/formFields.json'
import { Field, FormFields } from './interfaces/form.interface';
import { useState } from 'react';

enum Store {
  SPAIN = 'es',
  KOREA = 'kr',
  ITALIA = 'it'
}

const queryParams = new URLSearchParams(window.location.search);

const getFormFieldsByStore = (form: FormFields, store: string): Field[] => { 
  return form.custom ? [...form.generic, ...form.custom[store] || []] : [...form.generic];
};

const getFieldsOrderIdsByStore = (fields: Field[], fieldsOrderByDefault: string[]): string[] => {
  const fieldIds: string[] = fields.map(field => field.id);
  return fieldsOrderByDefault.filter((orderId: string) => fieldIds.includes(orderId));
}

const sortFieldsByStore = (fields: Field[], fieldsOrderIds: any): Field[] => {
  const order: any = {};
  fieldsOrderIds.forEach((fieldId, i) => order[fieldId] = i);
  return fields.sort((a, b) => order[a.id] - order[b.id]);
}

function App() {
  const actualStore: string = queryParams.get('store');
  const fields: Field[] = getFormFieldsByStore(loginForm, actualStore);
  const fieldsOrderIds: string[] = getFieldsOrderIdsByStore(fields, loginForm.fieldsOrder);
  const sortedFields: Field[] = sortFieldsByStore(fields, fieldsOrderIds);

  const [formVal, setFromVal] = useState({});

  const onSubmit = (value: any): void => {
    console.log(value);
    setFromVal(value);
  }
  
  return (
    <div>
      <h3>Dynamic Form with Validators</h3>
      <button style={{marginRight: 15}} onClick={() => window.open(`./?store=${Store.SPAIN}`, '_self')}>España</button>
      <button style={{marginRight: 15}} onClick={() => window.open(`./?store=${Store.ITALIA}`, '_self')}>Italia</button>
      <button onClick={() => window.open(`./?store=${Store.KOREA}`, '_self')}>Corea</button>

      <DynamicForm {...{fields: sortedFields, onSubmit}}/>

      {JSON.stringify(formVal) !== '{}' && <span className='result'>{JSON.stringify(formVal)}</span>}
    </div>
  );
}

export default App;
