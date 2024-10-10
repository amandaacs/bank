import { Button, Card, Flex, Typography, Select, Input } from 'antd'
import React, { useEffect, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom';


const Transacao = () => {
    const { userData } = useAuth(); 
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [selectedUserBalance, setSelectedUserBalance] = useState(0);
    const [amount, setAmount] = useState('');
    const apiUrl = process.env.REACT_APP_API_URL || 'https://bank-project-mnto.onrender.com';

    const onChange = async (value) => {
        console.log(`selected ${value}`);
        setSelectedUserId(value);
        const response = await fetch(`${apiUrl}/api/users/${value}/balance`); // Fetch balance of selected user
        const data = await response.json();
        setSelectedUserBalance(data.balance);
      };
      const onSearch = (value) => {
        console.log('search:', value);
      };

      const handleTransaction = async (type) => {
        const transactionAmount = parseFloat(amount);
        if (isNaN(transactionAmount) || transactionAmount <= 0) {
            alert('Please enter a valid amount.');
            return;
        }

        const response = await fetch(`${apiUrl}/api/users/${selectedUserId}/transaction`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ amount: transactionAmount, type }), // type can be 'add' or 'remove'
        });

        if (response.ok) {
            const updatedBalance = type === 'add' ? selectedUserBalance + transactionAmount : selectedUserBalance - transactionAmount;
            setSelectedUserBalance(updatedBalance);
            setAmount(''); // Clear input field
        } else {
            alert('Transaction failed. Please try again.');
        }
    };
    

    const handleVoltar = () => {
        navigate('/dashboard'); 
    };


    
    useEffect(() => {
        const fetchUsersByRole = async () => {
            try {
                // Fetch users with the role 'aluno'
                const response = await fetch(`${apiUrl}/api/users/aluno`); 
                const data = await response.json();
                setUsers(data); // Update state with fetched users
            } catch (error) {
                console.error('Failed to fetch users:', error);
            }
        };

        fetchUsersByRole();
    }, [apiUrl]);

 
  return (
    <Card className='profile-card'>
        <Flex vertical gap='small' align='center'>
        <Select
            className="std-select"
            showSearch
            placeholder="Selecione um aluno"
            optionFilterProp="label"
            onChange={onChange}
            onSearch={onSearch}
            options={users.map(user => ({
                value: user._id, // Use user ID as the value
                label: user.name, // Display user name
            }))}
        />
        {selectedUserId && (
                    <div className='transaction'>
                        <Typography.Text className='transaction-balance'>Saldo: ${selectedUserBalance.toFixed(2)}</Typography.Text>
                        <Input
                            type='number'
                            placeholder='Valor'
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                        />
                        <Flex gap='small'>
                            <Button onClick={() => handleTransaction('add')} type='primary' className='adicionar'>Adicionar</Button>
                            <Button onClick={() => handleTransaction('remove')} type='danger' className='remover'>Remover</Button>
                        </Flex>
                    </div>
                )}
            
            <Button size='large' type='primary' className='profile-btn' onClick={handleVoltar}>Voltar</Button>
            
        </Flex>
        
    </Card>
  )
}

export default Transacao
