import Guide from '@/components/Guide';
import { trim } from '@/utils/format';
import { PageContainer } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { Button } from 'antd';
import styles from './index.less';

const HomePage: React.FC = () => {
  const { name } = useModel('global');
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
