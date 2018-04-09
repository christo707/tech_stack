import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { connect } from 'react-redux';
import ListItem from './ListItem';


class LibraryList extends Component {

  renderItem({ item }) {
    return (
      <ListItem item={item} />
    );
  }

  render() {
    return (
      <FlatList
        data={this.props.libraries}
        renderItem={this.renderItem}
        keyExtractor={(item, index) => index.toString()}
      />

    );
  }
}

const mapStateToProps = state => ({
   libraries: state.libraries,
   selectedLibraryId: state.selectedLibraryId
 });

export default connect(mapStateToProps)(LibraryList);
