import React, {Component} from 'react'
import {Table, Icon} from 'antd';
import { connect } from 'react-redux';
import store from '../../redux/store.js';
import {getArticle, removeArticle} from '../../action/article'
class PostList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: false,
      page: 0,
      data: [],
      pagination: {}
    }
    this.columns = [
      {
        title: '标题',
        dataIndex: 'title',
        key: 'title',
        width: '80%',
        render: (text, record, index) => {
          return (
            <a onClick={this.goDetail.bind(this, record._id)}>{text}</a>
          )
        },
      },
      {
        title: '操作',
        key: 'action',
        width: '20%',
        render: (text, record) => (
          <span>
            <a onClick={this.goDetail.bind(this, record._id)}>编辑</a>
            <span className="ant-divider"/>
            <a href="#" className="ant-dropdown-link" onClick={this._remove.bind(this, record._id)}>删除</a>
            <span className="ant-divider"/>
            <a href="#">评论</a>
          </span>
        )
      }
    ]
  }

  _remove (id) {
    const self = this
    self.setState({
      loading: true
    });
    store.dispatch(removeArticle({id}, (data)=> {
      self.setState({
        loading: false
      });
      self._getList()
    }))
  }

  goDetail (id) {
    this.props.history.push(`/home/editor/${id}`)
  }

  handleTableChange (e) {
    const self = this
    this.setState({
        page: e.current - 1
    });
    setTimeout(()=>{
      console.log(self.state.page)
      self._getList()
    })
    // console.log(this.state.page)
    // this._getList()
  }
  _getList() {
    const self = this
    let page = this.state.page
    self.setState({
        loading: true
    });
    store.dispatch(getArticle({page}, (data)=> {
      console.log(data)
      const pagination = { ...self.state.pagination }
      pagination.total = data.count;
      self.setState({
        loading: false,
        pagination,
      });
    }))
  }
  componentDidUpdate() {
    
  }
  componentDidMount(){
    this._getList()
  }
  render () {
    const columns = this.columns;
    return (
      <section>
        <Table loading={this.state.loading}
               columns={columns}
               dataSource={this.props.article.aticles || []}
               pagination={this.state.pagination}
               onChange={this.handleTableChange.bind(this)}/>
      </section>
    )
  }
}

const mapStateToProps = function(store) {
  return {
    article: store.article
  };
};

export default connect(mapStateToProps)(PostList)