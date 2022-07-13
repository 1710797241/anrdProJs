import { , validatePhone, } from '@/utils/util';
import { PageContainer } from '@ant-design/pro-components';
import { Access, useAccess } from '@umijs/max';
import { Button, Input } from 'antd';

const AccessPage: React.FC = () => {
 
  
  const access = useAccess();
  const handleSearch = (value:string)=>{
    console.log('handleSearch',value);
    
  }
  return (
    <PageContainer
      ghost
      header={{
        title: '权限示例',
      }}
    >
      <Access accessible={access.canSeeAdmin}>
        <Button>只有 Admin 可以看到这个按钮</Button>
       
      </Access>
    </PageContainer>
  );
};

export default AccessPage;
