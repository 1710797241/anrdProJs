import Guide from '@/components/Guide';
import { trim } from '@/utils/format';
import { PageContainer } from '@ant-design/pro-components';
import { useModel,request } from '@umijs/max';
import { Button, message } from 'antd';
import { useEffect } from 'react';
import styles from './index.less';

const HomePage: React.FC = () => {
  const { name } = useModel('global');
  useEffect(()=>{
    handleRequest()
  },[])
  const handleRequest = async()=>{
   try {
    const data = await request("https://open.feishu.cn/open-apis/mina/v2/tokenLoginValidate")
    console.log('success==>',data);
    
   } catch (error:any) {   
     console.log('error==>',error);

    message.error(error.message||error)
   }
  }
  return (
    <PageContainer ghost>
      <div className={styles.container}>
        <Guide name={trim(name)} />
        <div className='font-bold	text-2xl line-through text-blue-600/100'>tailwind</div>
        <Button type='primary'>primary</Button>
      </div>
    </PageContainer>
  );
};

export default HomePage;
