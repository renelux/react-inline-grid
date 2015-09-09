import React, { Component, PropTypes, Children, cloneElement } from 'react';
import { connect } from 'react-redux';
import pick from '../utils/pick';

const mapStateToProps = state => ({ ...state });

const mergeProps =
  (stateProps, dispatchProps, { is, ...clean }) => ({
    ...clean,
    grid: {
      ...stateProps,
      is
    }
  });

const gridShape =
  PropTypes.shape({
    media: PropTypes.object.isRequired,
    reference: PropTypes.object.isRequired,
    is: PropTypes.string
  }).isRequired;

export function elem(tag) {
  return class Elem extends Component {
    static propTypes = {
      grid: gridShape
    };

    shouldComponentUpdate(nextProps) {
      return nextProps.grid.media.name !== this.props.grid.media.name;
    }

    render() {
      const { grid, children, ...clean } = this.props;
      return (
        <div style={pick(tag, grid)}>
          {Children.map(children, child => {
            return cloneElement(child, {...clean});
          })}
        </div>
      );
    }
  };
}

export default function createComponent(tag) {
  return connect(
    mapStateToProps,
    null,
    mergeProps)(elem(tag));
}
