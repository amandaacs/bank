import React from 'react'
import { Link } from 'react-router-dom';
import { Card, Flex, Typography, Form, Input, Button, Alert, Spin, Radio } from 'antd';
import useSignup from '../hooks/useSignup.jsx';




const Register = () => {
    const { loading, error, registerUser } = useSignup();

   
    const handleRegister = (values) => {
        registerUser(values);
    };


    
  return (
    
    <Card className='form-container'>

        <Flex gap='large' align='center'>
            {/* form */}
            <Flex vertical flex={1}>
                <Typography.Title level={3} strong className='title'>Novo Usuário</Typography.Title>
                
                <Form layout='vertical' onFinish={handleRegister} autoComplete='off'>
                    <Form.Item label='Name' name='name' rules={[{
                        required: true,
                        message: 'Nome'
                    }]}>
                        <Input size='large' placeholder='Nome' />

                    </Form.Item>
                    <Form.Item label='Username' name='username' rules={[{
                        required: true,
                        message: 'Nome de Usuário'
                    }]}>
                        <Input size='large' placeholder='Nome de Usuário' />

                    </Form.Item>
                    
                    <Form.Item label='Password' name='password' rules={[
                        {
                        required: true,
                        message: 'Crie uma senha'
                        }
                    ]}>
                        <Input.Password size='large' placeholder='Password' />

                    </Form.Item>
                    <Form.Item label='Password' name='passwordConfirm' rules={[
                        {
                        required: true,
                        message: 'Confirme a senha'
                        }
                    ]}>
                        <Input.Password size='large' placeholder='Confirme a Senha' />

                    </Form.Item>
                        <Form.Item label="Tipo de Conta" name='role' rules={[
                            {
                                required: true
                            }
                        ]}>
                            <Radio.Group>
                            <Radio value='aluno'> Aluno </Radio>
                            <Radio value='teacher'> Teacher </Radio>
                            <Radio value='adm'> Adm </Radio>
                        </Radio.Group>
                    </Form.Item>
                    {
                        error && <Alert description={error} type='error' showIcon closable className='alert' />
                    }
                    <Form.Item>
                        <Button 
                        type={`${loading ? '' : 'primary'}`} 
                        htmlType='submit' size='large' 
                        className='btn'
                        >{loading ? <Spin /> : 'Criar Conta'}</Button>
                    </Form.Item>
                    <Form.Item>
                        <Link to="/dashboard">
                            <Button size='large' type='primary'className='btn'>Voltar</Button>
                        </Link>
                        
                    </Form.Item>
                </Form>
            </Flex>
            {/* image 
            <Flex flex={1}>
                <img src={signupimg} className='auth-img' />
            </Flex> */}
        </Flex>
    </Card>
  )
};

export default Register
