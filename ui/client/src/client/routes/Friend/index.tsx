import * as React from 'react';
import { Collapse, Layout } from 'antd';
import CardLink from '../../components/CardLink';
import { Expander } from '../../components';
import { fetchUserCategories, expanedUserCategory, collapseUserCategory } from '../../actions/userCategoryAction';
import { fetchUsersByFriendCategoryId } from '../../actions/userBaseInfoAction';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { UserCategoryState } from '../../reducers/userCategoryData';
import { UserFriendCategoryDto } from '../../models/dto';

const { Header, Footer, Sider, Content } = Layout;
const Panel = Collapse.Panel;

interface FriendProps {
  userId: number;
  userFriendCategories: UserFriendCategoryDto[];
  activeCategoryIds: string[];
  fetchUserCategories: (userId: number) => void;
  fetchUsersByFriendCategoryId: (categoryId: number) => void;
  expanedUserCategory: (categoryId: number) => void;
  collapseUserCategory: (categoryId: number) => void;
}

interface FriendState {
  userCategoryData: UserCategoryState;
}

export class Friend extends React.Component<FriendProps, any> {
  componentWillMount() {
    if (!this.props.userFriendCategories || this.props.userFriendCategories.length === 0) {
      this.props.fetchUserCategories(this.props.userId);
    }
  }

  render() {
    const imageUrl1 = 'https://avatars3.githubusercontent.com/u/4081993?s=64v=4';
    const imageUrl2 = 'https://avatars3.githubusercontent.com/u/11556152?s=64v=4';
    return (
      <Layout style={{ width: '100%', height: '100%' }}>
        <Sider width={250} style={{ backgroundColor: '#EEEBE9' }}>
          {
            this.props.userFriendCategories.map((p, i) => {
              return (
                <Expander
                  header={p.categoryName}
                  key={p.id}
                  isOpen={p.isOpen}
                  expanded={() => {
                    this.props.expanedUserCategory(p.id);
                    this.props.fetchUsersByFriendCategoryId(p.id);
                  }}
                  collapsed={() => this.props.collapseUserCategory(p.id)}
                >
                  {
                    (p.userBaseInfos || []).map((user, j) => {
                      return (
                        <CardLink
                          key={user.id}
                          to={`/chat/` + user.id}
                          imageUrl={imageUrl1}
                          title={user.displayName || user.userName}
                          subTitle="在线"
                        />);
                    })
                  }
                </Expander>);
            })
          }
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
    userId: state.userCategoryData.userId,
    userFriendCategories: state.userCategoryData.items
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  fetchUserCategories: (id: number) => dispatch(fetchUserCategories(id)),
  fetchUsersByFriendCategoryId: (categoryId: number) => dispatch(fetchUsersByFriendCategoryId(categoryId)),
  expanedUserCategory: (categoryId: number) => dispatch(expanedUserCategory(categoryId)),
  collapseUserCategory: (categoryId: number) => dispatch(collapseUserCategory(categoryId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Friend);
