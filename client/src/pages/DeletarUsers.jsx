import { Button, Card, Flex, Typography, Select, Modal } from 'antd'
import React, { useEffect, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom';


const DeletarUsers = () => {
    const { userData } = useAuth(); 
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [selectedUserName, setSelectedUserName] = useState('');
    const [statusMessage, setStatusMessage] = useState('');
    

    const onChange = async (value) => {
        setSelectedUserId(value);
        const user = users.find(user => user._id === value);
        setSelectedUserName(user.name);
        
        
      };
      const onSearch = (value) => {
        console.log('search:', value);
      };

      
    const handleDeleteUser = async () => {
        if (!selectedUserId) return;
        Modal.confirm({
            title: 'Deletar Conta?',
            content: `User: ${selectedUserName}`,
            onOk: async () => {
                const response = await fetch(`http://localhost:3000/api/users/${selectedUserId}`, {
                    method: 'DELETE',
                });

        

        if (response.ok) {
            // Remove the deleted user from the local state
            setUsers(users.filter(user => user._id !== selectedUserId));
            setSelectedUserId(null);
            setSelectedUserName('');
            setStatusMessage('User deleted successfully.');
        } else {
            setStatusMessage('Failed to delete user. Please try again.');
        }
    }, 
    onCancel() {
        console.log('Cancel');
    },
});
};
    

    const handleVoltar = () => {
        navigate('/dashboard'); 
    };


    
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/users/'); 
                const data = await response.json();
                setUsers(data); 
            } catch (error) {
                console.error('Failed to fetch users:', error);
            }
        };

        fetchUsers();
    }, []);

 
  return (
    <Card className='profile-card'>
        <Flex vertical gap='small' align='center'>
        <Select
            showSearch
            className="std-select"
            placeholder="Select a person"
            optionFilterProp="label"
            onChange={onChange}
            onSearch={onSearch}
            options={users.map(user => ({
                value: user._id, // Use user ID as the value
                label: user.name, // Display user name
            }))}
        />
        {selectedUserId && (
                    <div className='delete-user'>
                        
                        <Typography.Text className='deleted-user'>Selecionado: {selectedUserName}     </Typography.Text>
                        
                            <Button onClick={() => handleDeleteUser()} type='primary' className='remover'>Deletar Usuário</Button>
                            
                        
                    </div>
                )}

                {statusMessage && (
                    <Typography.Text type={statusMessage.includes('Failed') ? 'danger' : 'success'}>
                        {statusMessage}
                    </Typography.Text>
                )}
            
            <Button size='large' type='primary' className='profile-btn' onClick={handleVoltar}>Voltar</Button>
            
        </Flex>
        
    </Card>
  )
}

export default DeletarUsers
