import { Link } from 'react-router-dom';


const IndexPage = () => <div className="container">
  <h1>Hello tesomsz</h1>
  <p>You are viewing MFDB</p>

  <div className="jumbotron">
    <h2>Links</h2>

    <ul>
      <li><Link to="/metabolite/ZKHQWZAMYRWXGA-KQYNXXCUSA-N">ATP</Link></li>
      <li><Link to="/metabolite/XLYOFNOQVPJJNP-UHFFFAOYSA-N">Water</Link></li>
      <li><Link to="/metabolite/MYWUZJCMWCOHBA-VIFPVBQESA-N">Metamphetamine</Link></li>
      <li><Link to="/metabolite/FPQMUQPPAYCAME-UHFFFAOYSA-N">2-Acetyl-6-methylpyridine</Link></li>
    </ul>
    <hr/>
    <ul>
      <li><Link to="/asdage1">404 page</Link></li>
      <li><Link to="/bootstrap">Bootstrap tests</Link></li>
    </ul>

  </div>
</div>;

export default IndexPage;
