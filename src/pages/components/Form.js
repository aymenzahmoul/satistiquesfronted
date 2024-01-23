import React, { useState } from 'react';
import {
    MDBBtn,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBInput,
}
    from 'mdb-react-ui-kit';
import { signup } from '../../service/Register';

function Form() {

    const [userData, setUserData] = useState({
        nom: '',
        prenom: '',
        idcrm: '',
        tel: '',
        Address: '',
        email: '',
        login: '',
        password: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    const handleRegister = async () => {
        try {
            const result = await signup(userData);

            if (result.success) {
                
                console.log('User registered successfully:', result.data);
                navigator('/Store')
            } else {
              
                console.error('Error during registration:', result.error);
            }
        } catch (error) {
           
            console.error('Error during registration:', error);
        }
    };
    return (

        <MDBCol >

            <MDBCard className='my-2'>
                <MDBCardBody className='p-5'>

                    <MDBRow>
                        <MDBCol col='6'>
                            <MDBInput wrapperClass='mb-1' label='Nom' name='Nom' value={userData.Nom} id='form1' type='text'  onChange={handleInputChange}/>
                        </MDBCol>

                        <MDBCol col='6'>
                            <MDBInput wrapperClass='mb-1' name='Prenom' label='Prenom'value={userData.Prenom}  id='form1' type='text' onChange={handleInputChange} />
                        </MDBCol>
                    </MDBRow>
                    <MDBRow>
                        <MDBCol col='6'>
                        <MDBInput wrapperClass='mb-1'value={userData.IDCRM} name='idCRM' label='IDCRM' onChange={handleInputChange} id='form1' type='text'/>
                        </MDBCol>

                        <MDBCol col='6'>
                        <MDBInput wrapperClass='mb-1' value={userData.Tel} name='Tel' label='Tel' id='form1'onChange={handleInputChange} type='text'/>
                    
                        </MDBCol>
                    </MDBRow>
                    <MDBRow>
                        <MDBCol col='6'>
                        <MDBInput wrapperClass='mb-1' value={userData.Address} name='Address' label='Adresse'onChange={handleInputChange} id='form1' type='text'/>
                        </MDBCol>

                        <MDBCol col='6'>
                        <MDBInput wrapperClass='mb-1'value={userData.Email} name='Email'label='Email'onChange={handleInputChange}id='form1' type='text'/>
                    
                        </MDBCol>
                    </MDBRow>
                    <MDBInput wrapperClass='mb-2' label='Login' name='Login' value={userData.Login} onChange={handleInputChange} id='form1' type='text' />
                    <MDBInput wrapperClass='mb-2' label='Password' name='Password' value={userData.Password} id='form1'onChange={handleInputChange} type='password' />

                    <div className='d-flex justify-content-center mb-3'>
                    </div>
                    <MDBBtn className='w-100 mb-2 bg-primary' onClick={handleRegister} size='md'>Register</MDBBtn>
                    <div className="text-center">
                    </div>

                </MDBCardBody>
            </MDBCard>

        </MDBCol>


    );
}

export default Form;
