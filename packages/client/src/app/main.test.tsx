import ReactDOM from 'react-dom'
import {Routing} from '../pages'

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Routing />, div);
});