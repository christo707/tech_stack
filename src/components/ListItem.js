import React, { Component } from 'react';
import { Text, TouchableWithoutFeedback, View, LayoutAnimation, NativeModules } from 'react-native';
import { connect } from 'react-redux';
import { CardSection } from './common';
import * as actions from '../../actions';

const { UIManager } = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental
&& UIManager.setLayoutAnimationEnabledExperimental(true);

class ListItem extends Component {

  componentWillUpdate() {
    LayoutAnimation.spring();
  }

  renderDescription() {
    const { item, expanded } = this.props;

    if (expanded) {
      return (
        <CardSection>
          <Text
            style={{
              flex: 1,
            paddingLeft: 5,
            paddingRight: 5,
            fontSize: 18,
            color: '#000'
        }}>
            {item.description}
          </Text>
        </CardSection>
      );
    }
  }


  render() {
    const { textStyle } = styles;
    const { id, title } = this.props.item;

    return (
      <TouchableWithoutFeedback onPress={() => this.props.selectLibrary(id)}>
        <View>
          <CardSection>
            <Text style={textStyle}> {title } </Text>
          </CardSection>
          {this.renderDescription()}
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = {
  textStyle: {
    paddingLeft: 5,
    paddingRight: 5,
    fontSize: 20,
    color: '#000'
  }
};

const mapStateToProps = (state, ownProps) => {
  const expanded = state.selectedLibraryId === ownProps.item.id;
  return ({
     expanded
   });
};


export default connect(mapStateToProps, actions)(ListItem);
