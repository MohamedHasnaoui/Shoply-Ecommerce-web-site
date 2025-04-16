
const LatestOrders = () => {
  return (
    <div className="block block-rounded">
        <div className="block-content block-content-full">
            <table className="table table-borderless table-striped mb-0">
                <thead>
                    <tr>
                        <th style={{width: 100}}>ID</th>
                        <th>Status</th>
                        <th className="d-none d-sm-table-cell">Customer</th>
                        <th className="d-none d-sm-table-cell text-end">Value</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <td>
                        <a className="fw-semibold" href="be_pages_ecom_order.html">ORD.1851</a>
                    </td>
                    <td>
                        <span className="badge bg-info">Processing</span>
                    </td>
                    <td className="d-none d-sm-table-cell">
                        <a href="be_pages_ecom_customer.html">Carol Ray</a>
                    </td>
                    <td className="d-none d-sm-table-cell text-end">$268</td>
                    </tr>
                    <tr>
                    <td>
                        <a className="fw-semibold" href="be_pages_ecom_order.html">ORD.1850</a>
                    </td>
                    <td>
                        <span className="badge bg-success">Completed</span>
                    </td>
                    <td className="d-none d-sm-table-cell">
                        <a href="be_pages_ecom_customer.html">Albert Ray</a>
                    </td>
                    <td className="d-none d-sm-table-cell text-end">$772</td>
                    </tr>
                    <tr>
                    <td>
                        <a className="fw-semibold" href="be_pages_ecom_order.html">ORD.1849</a>
                    </td>
                    <td>
                        <span className="badge bg-info">Processing</span>
                    </td>
                    <td className="d-none d-sm-table-cell">
                        <a href="be_pages_ecom_customer.html">Lisa Jenkins</a>
                    </td>
                    <td className="d-none d-sm-table-cell text-end">$111</td>
                    </tr>
                    <tr>
                    <td>
                        <a className="fw-semibold" href="be_pages_ecom_order.html">ORD.1848</a>
                    </td>
                    <td>
                        <span className="badge bg-success">Completed</span>
                    </td>
                    <td className="d-none d-sm-table-cell">
                        <a href="be_pages_ecom_customer.html">Jose Mills</a>
                    </td>
                    <td className="d-none d-sm-table-cell text-end">$356</td>
                    </tr>
                    <tr>
                    <td>
                        <a className="fw-semibold" href="be_pages_ecom_order.html">ORD.1847</a>
                    </td>
                    <td>
                        <span className="badge bg-warning">Pending</span>
                    </td>
                    <td className="d-none d-sm-table-cell">
                        <a href="be_pages_ecom_customer.html">Thomas Riley</a>
                    </td>
                    <td className="d-none d-sm-table-cell text-end">$485</td>
                    </tr>
                    <tr>
                    <td>
                        <a className="fw-semibold" href="be_pages_ecom_order.html">ORD.1846</a>
                    </td>
                    <td>
                        <span className="badge bg-danger">Canceled</span>
                    </td>
                    <td className="d-none d-sm-table-cell">
                        <a href="be_pages_ecom_customer.html">Alice Moore</a>
                    </td>
                    <td className="d-none d-sm-table-cell text-end">$597</td>
                    </tr>
                    <tr>
                    <td>
                        <a className="fw-semibold" href="be_pages_ecom_order.html">ORD.1845</a>
                    </td>
                    <td>
                        <span className="badge bg-warning">Pending</span>
                    </td>
                    <td className="d-none d-sm-table-cell">
                        <a href="be_pages_ecom_customer.html">Amanda Powell</a>
                    </td>
                    <td className="d-none d-sm-table-cell text-end">$156</td>
                    </tr>
                    <tr>
                    <td>
                        <a className="fw-semibold" href="be_pages_ecom_order.html">ORD.1844</a>
                    </td>
                    <td>
                        <span className="badge bg-info">Processing</span>
                    </td>
                    <td className="d-none d-sm-table-cell">
                        <a href="be_pages_ecom_customer.html">Jose Wagner</a>
                    </td>
                    <td className="d-none d-sm-table-cell text-end">$669</td>
                    </tr>
                    <tr>
                    <td>
                        <a className="fw-semibold" href="be_pages_ecom_order.html">ORD.1843</a>
                    </td>
                    <td>
                        <span className="badge bg-danger">Canceled</span>
                    </td>
                    <td className="d-none d-sm-table-cell">
                        <a href="be_pages_ecom_customer.html">Jack Greene</a>
                    </td>
                    <td className="d-none d-sm-table-cell text-end">$650</td>
                    </tr>
                    <tr>
                    <td>
                        <a className="fw-semibold" href="be_pages_ecom_order.html">ORD.1842</a>
                    </td>
                    <td>
                        <span className="badge bg-success">Completed</span>
                    </td>
                    <td className="d-none d-sm-table-cell">
                        <a href="be_pages_ecom_customer.html">Lori Grant</a>
                    </td>
                    <td className="d-none d-sm-table-cell text-end">$683</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default LatestOrders
