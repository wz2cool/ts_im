import * as React from 'react';
import { Collapse, Layout } from 'antd';
import CardLink from '../../components/CardLink';
import { fetchUserCategories } from '../../actions/userCategoryAction';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { UserCategoryState } from '../../reducers/userData';
import { UserFriendCategoryDto } from '../../models/dto';

const { Header, Footer, Sider, Content } = Layout;
const Panel = Collapse.Panel;

interface FriendProps {
  userId: number;
  userFriendCategories: UserFriendCategoryDto[];
  fetchUserCategories: (userId: number) => void;
}

interface FriendState {
  userData: UserCategoryState;
}

export class Friend extends React.Component<FriendProps, any> {
  componentWillMount() {
    this.props.fetchUserCategories(this.props.userId);
  }

  render() {
    console.log(`test: ${this.props.userId}`);
    console.log(`data: ${this.props.userFriendCategories}`);
    const imageUrl1 = 'https://avatars3.githubusercontent.com/u/4081993?s=64v=4';
    const imageUrl2 = 'https://avatars3.githubusercontent.com/u/11556152?s=64v=4';
    return (
      <Layout style={{ width: '100%', height: '100%' }}>
        <Sider width={250} style={{ backgroundColor: '#EEEBE9' }}>
          <Collapse style={{ backgroundColor: 'transparent', border: 'none' }}>
            {/* <Panel header="家人" key="1">
              <CardLink to={`/chat/${1}`} imageUrl={imageUrl1} title="张三" subTitle="在线" />
              <CardLink to={`/chat/${1}`} imageUrl={imageUrl1} title="张三" subTitle="在线" />
              <CardLink to={`/chat/${1}`} imageUrl={imageUrl1} title="张三" subTitle="在线" />
              <CardLink to={`/chat/${1}`} imageUrl={imageUrl1} title="张三" subTitle="在线" />
            </Panel>
            <Panel header="朋友" key="2">
              <CardLink to={`/chat/${2}`} imageUrl={imageUrl2} title="李四" subTitle="在线" />
            </Panel> */}
            {this.props.userFriendCategories.map((p, i) => {
              console.log(p.categoryName);
              return (<Panel header={p.categoryName} key={p.id.toString()} />);
            })}
          </Collapse>
        </Sider>
        <Content style={{ backgroundColor: '#F0F2F5' }}>
          {this.props.children}
        </Content>
      </Layout>
    );
  }
}

const mapStateToProps = (state: FriendState) => {
  return {
    userId: state.userData.userId,
    userFriendCategories: state.userData.items
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  fetchUserCategories: (id: number) => dispatch(fetchUserCategories(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Friend);