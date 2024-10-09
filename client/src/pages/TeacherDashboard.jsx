import { Avatar, Button, Card, Flex, Typography } from 'antd'
import { UserOutlined } from '@ant-design/icons';
import React from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom';


const Dashboard = () => {
    const { userData, logout } = useAuth(); 
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
    };

    

    const handleTransacao = () => {
        navigate('/transacao'); 
    };

 
  return (
    <Card className='profile-card'>
        <Flex vertical gap='small' align='center'>
            <Avatar  className='avatar'>{userData.name[0]}</Avatar>
            <div className='text-wrap'>
            <Typography.Title level={2} strong className='username'>
                {userData.name}
            </Typography.Title>
            </div>
            <Typography.Text type='secondary' strong>Username: {userData.username}</Typography.Text>
         
            
            <Button size='large' type='primary' className='profile-btn' onClick={handleTransacao}>
                    Nova Transação
                </Button>

            <Button size='large' type='primary' className='profile-btn' onClick={handleLogout}>Logout</Button>
            
        </Flex>
        
    </Card>
  )
}

export default Dashboard
