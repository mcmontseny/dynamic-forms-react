import { useForm } from "react-hook-form";

import { Field, Validation } from "../../interfaces/form.interface";

interface FormFieldProps {
    field: Field;
    register: any;
    errors: any;
}

interface RHFValidator {
    [validatorType: string]: ReactHookFormValidator;
}

interface ReactHookFormValidator {
    value: boolean | string | number;
    message: string
}

const getReactHookFormValidators = (validations: Validation[]): RHFValidator => {
    const validators: RHFValidator = {}
    validations.forEach(({ type, value, message}: Validation) => validators[type] = {value, message});
    return validators;
}

function FormField({ field, register, errors }: FormFieldProps): JSX.Element {
    const {id, label, placeholder, type, validations} = field;
    const validators: RHFValidator = getReactHookFormValidators(validations);
    return <div className="field" style={{paddingTop: 5}}>
        <label htmlFor={id} style={{paddingRight: 20}}>{label}:</label>
        <input type={type} id={id} name={id} placeholder={placeholder} {...register(id, validators)}></input><br />
        {errors[id] && <span className="errValidator">{errors[id].message}</span>}
    </div>;
}

interface DynamicFormProps {
    fields: any[];
    onSubmit: (value: any) => void;
}

function DynamicForm({ fields, onSubmit}: DynamicFormProps) : JSX.Element {
    const { handleSubmit, register, formState: { errors } } = useForm();
    return (
        <form onSubmit={handleSubmit(onSubmit)} style={{marginTop: 15, marginBottom: 15}}>
            {
               fields.map((field: Field) => <FormField key={field.id} {...{field, register, errors }} />) 
            }
            <br />
            <input type="submit" value="Guardar datos" />
        </form>
    )
}

export default DynamicForm;