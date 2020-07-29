import {connect} from 'react-redux';
import TripListOptions from './TripListOptions';
import {getAllTags} from '../../../redux/tagsRedux';
import {getAllFilters,
  changeSearchPhrase,
  changeDurationFrom,
  changeDurationTo,
  addTags,
  removeTags} from '../../../redux/filtersRedux';

const mapStateToProps = state => ({
  tags: getAllTags(state),
  filters: getAllFilters(state),
});

const mapDispatchToProps = dispatch => ({
  changeSearchPhrase: phrase => dispatch(changeSearchPhrase(phrase)),
  // TODO - add more dispatchers for other filters
  changeDurationFrom: value => dispatch(changeDurationFrom(parseInt(value))),
  changeDurationTo: value => dispatch(changeDurationTo(parseInt(value))),
  addTags: tag => dispatch(addTags(tag)),
  removeTags: tag => dispatch(removeTags(tag)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TripListOptions);
