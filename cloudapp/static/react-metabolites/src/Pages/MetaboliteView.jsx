import { useParams } from 'react-router-dom';


const MetaboliteView = () => {
  let { mid } = useParams();

  return <div className="container">
    metabolite view for { mid }
  </div>;
}

export default MetaboliteView;
