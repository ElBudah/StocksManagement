import * as yup from 'yup';

const userSchema = yup.object().shape({
    txtName: yup.string().required('You must enter a name'),
    txtEmail: yup.string().email('Must be email format').required('You must enter an email'),
    txtPass: yup.number().required('You must enter a password').min(999,'You password is not long enough!')
})

export default userSchema;