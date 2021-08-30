import { memo } from "react"
import { connect } from "react-redux";
import { ISong } from "../../interfaces";
import { PlayAction } from "../../redux/actions/playerActions";
import './TableRow.scss';


interface TableRowProps {
    data: ISong,
    onChange?: any,
    PlayAction: any
}

const TableRow = ({ data, onChange, PlayAction }: TableRowProps) => {

    const handlePlay = () => {
        PlayAction(data);
    }
    const handleMore = () => {

    }
    return (
        <tr onContextMenu={(e: any) => onChange(e, data)}>
            <th style={{ width: "30%" }}>
                {data.title}
                <div className="submenu">
                    <button onClick={handlePlay}>
                        <i className="ui-icon-play"></i>
                    </button>
                    <button onClick={handleMore}>
                        <i className="ui-icon-add"></i>
                    </button>
                </div>
            </th>
            <td style={{ width: "15%" }}>{data.album.title}</td>
            <td style={{ width: "15%" }}>{data.artist.title}</td>
            <td style={{ padding: 0 }}>
                <button>
                    <i className="ui-icon-heart"></i>
                </button>
            </td>
            <td style={{ width: "10%" }}>{data.genre}</td>
            <td>{data.year}</td>
            <td>{data.length}</td>
        </tr>
    )
}

export default connect(null, { PlayAction })(memo(TableRow));
