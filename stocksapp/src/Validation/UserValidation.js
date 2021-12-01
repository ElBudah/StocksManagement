import * as yup from 'yup';

const userSchema = yup.object().shape({
    txtName: yup.string().required('You must enter a name'),
    txtEmail: yup.string().email('Must be email format').required('You must enter an email'),
    txtPass: yup.string().required('You must enter a password').min(4,'You password is not long enough!')
})

export default userSchema;