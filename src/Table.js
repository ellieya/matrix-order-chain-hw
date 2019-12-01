import React from 'react';

class Table extends React.Component {

    buildTable = () => {
        let outerList = [];
        let innerList = [];
        console.log(this.props.value.length + " " + this.props.value[0].length);
        for (let i = 0; i < this.props.value.length; i++) {
            for (let j = 0; j < this.props.value[i].length; j++) {
                innerList.push(<td key={"j " + i + j}>{this.props.value[i][j]}</td>)
            }
            outerList.push(<tr key={"i" + i}>{innerList}</tr>)
            innerList = [];
        }
        return outerList;
    }

    render() {
        return <div>
            <h1>{this.props.title}</h1>
            <table border="1">
                {this.buildTable()}
            </table>
        </div>
    }
}

export default Table;