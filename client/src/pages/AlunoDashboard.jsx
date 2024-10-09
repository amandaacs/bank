import { Avatar, Button, Card, Flex, Typography } from 'antd'
import { UserOutlined } from '@ant-design/icons';
import React, { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'

const AlunoDashboard = () => {
    const { userData, logout } = useAuth(); 
    const [balance, setBalance] = useState(userData.balance);

    useEffect(() => {
        setBalance(userData.balance);
    }, [userData.balance]);

    const handleLogout = async () => {
        await logout();
    };

    
 
  return (
    <Card className='profile-card'>
        <Flex vertical gap='small' align='center'>
            <Avatar  className='avatar'>{userData.name[0]}</Avatar>
            <div className='text-wrap'>
            <Typography.Title level={2} strong className='username'>
                Hello, {userData.name}!
            </Typography.Title>
            </div>
            <Typography.Text type='secondary' strong>Seu saldo é: </Typography.Text>
            <Typography.Text type='primary' strong className='saldo'>
                {userData.balance}
            </Typography.Text>
            <Typography.Text type='secondary' strong>Dollars!</Typography.Text>
            <Typography.Text type='secondary'>{userData.username}</Typography.Text>
           
            
            <Button size='large' type='primary' className='profile-btn' onClick={handleLogout}>Logout</Button>
        </Flex>
        
    </Card>
  )
}

export default AlunoDashboard;
