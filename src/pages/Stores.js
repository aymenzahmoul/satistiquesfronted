import React, { useState, useEffect } from 'react';
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import UserApi from '../service/UserApi';
import { Button, Card } from 'reactstrap';
import { Dialog } from 'primereact/dialog';


import Form from './components/Form';
function Stores() {
    const [users, setUsers] = useState([]);
    const [visible, setVisible] = useState(false); // Déclarer le state visible

    const [formValue, setFormValue] = useState({
        fname: 'Mark',
        lname: 'Otto',
        email: '',
        city: '',
        state: '',
        zip: '',
    });

    const onChange = (e) => {
        setFormValue({ ...formValue, [e.target.name]: e.target.value });
    };

    const handleHide = () => {
        setVisible(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        setVisible(false);
    };
    const fetchUsers = async () => {
        try {
            const userData = await UserApi.getAllUsers();
            setUsers(userData.data);
            console.log(userData.data);
        } catch (error) {
            console.error("Erreur lors de la récupération des utilisateurs :", error);
        }
    };
    useEffect(() => {
        

        fetchUsers();
    }, []);
 
        const [deleteMessage, setDeleteMessage] = useState('');
      
        const handleDelete = async (userId) => {
            try {
              const response = await fetch(`http://localhost:8002/auth/deleteUser/${userId}`, {
                method: 'DELETE',
                headers: {
                  'Content-Type': 'application/json',
                },
              });
              
              if (response.ok) {
                const data = await response.json();
                setDeleteMessage(data.message);
                console.log(data.message);
               
                fetchUsers();
                window.location.href = '/Store';
              } else {
                const errorData = await response.json();
                setDeleteMessage(`Error: ${errorData.message}`);
              }
            } catch (error) {
              console.error('Error deleting user:', error.message);
              setDeleteMessage('An error occurred while deleting the user');
            }
          };
    
    return (

        <>
       <div className="container">
  <div className="row">
    <div className="col">
      {/* Your content goes here */}

      <div className='d-flex justify-content-end '>
        <Button className='bg-primary' icon="pi pi-external-link "  onClick={() => setVisible(true)} style={{  color: 'white' }}>
          Ajoute
        </Button>
      </div>
    </div>
  </div>
</div>
        <Card>
           
            <MDBTable align='middle'>


                <MDBTableHead>
                    <tr>
                        <th scope='col'>Name</th>
                        <th scope='col'>Telephone</th>
                        <th scope='col'>Role</th>
                        <th scope='col'>Actions</th>
                    </tr>
                </MDBTableHead>
                <MDBTableBody>
                    {users.map(user => (
                        <tr key={user._id}>
                            <td>
                                <div className='d-flex align-items-center'>
                                    <img
                                        src={user.avatar}
                                        alt={user.name}
                                        style={{ width: '45px', height: '45px' }}
                                        className='rounded-circle'
                                    />
                                    <div className='ms-3'>
                                        <p className='fw-bold mb-1'>{user.Nom} {user.Prenom}</p>
                                        <p className='text-muted mb-0'>{user.Email}</p>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <p className='fw-normal mb-1'>{user.Tel}</p>
                                <p className='text-muted mb-0'>{user.Address}</p>
                            </td>
                            <td>
                                <MDBBadge color='success' pill>
                                    {user.Role}
                                </MDBBadge>
                            </td>

                            <td>
                                <label htmlFor="icon"></label><br />

                                <Button
                                    icon="pi pi-external-link"
                                    onClick={() => handleDelete(user._id)}
                                    style={{
                                        backgroundColor: '#F33232',
                                        color: 'white',

                                    }}
                                >
                                    DELETE
                                </Button>
                                <Dialog
                                    visible={visible}
                                    onHide={() => setVisible(false)}
                                >
                                    <Form />
                                </Dialog>
                            </td>
                        </tr>
                    ))}
                </MDBTableBody>
            </MDBTable>
        </Card>
        </>
    );
}

export default Stores;
