import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Flex, Typography, Form, Input, Button, Alert, Spin } from 'antd';
import useLogin from '../hooks/useLogin';
// import signupimg from '../assets/signupimg.svg';

const Login = () => {

    const {error, loading, loginUser} = useLogin();
    const handleLogin = async(values) => {
        await loginUser(values);
    }
  return (

    <Card className='form-container'>
        <Flex gap='small' align='center'>
            
            {/*<Flex>
                <img src={signupimg} className='auth-img' />
                
            </Flex>*/}
            
            
            {/* form */}
            <Flex vertical flex={1}>
                <Typography.Title level={3} strong className='title'>Login</Typography.Title>
                
                <Form layout='vertical' onFinish={handleLogin} autoComplete='off'>
                    
                    <Form.Item label='Username' name='username' rules={[
                        {
                        required: true,
                        message: 'Nome de Usuário'
                        },
                        {
                            type: 'username',
                            message: 'inválido'
                        }
                    ]}>
                        <Input size='large' placeholder='Nome de Usuário' />

                    </Form.Item>
                    <Form.Item label='Senha' name='password' rules={[
                        {
                        required: true,
                        message: 'Insira sua senha'
                        }
                    ]}>
                        <Input.Password size='large' placeholder='Senha' />

                    </Form.Item>
                    
                    {
                        error && <Alert description={error} type='error' showIcon closable className='alert' />
                    }
                    <Form.Item>
                        <Button 
                        className='btn'
                        type={`${loading ? '' : 'primary'}`} 
                        htmlType='submit' size='large' 
                        >{loading ? <Spin /> : 'Login'}</Button>
                    </Form.Item>
                    
                </Form>
            </Flex>
            
        </Flex>
    </Card>
  )
}

export default Login
