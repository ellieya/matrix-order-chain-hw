import React from 'react';
import Table from './Table';

class Main extends React.Component {


    matrixChainOrder = (dims) => {
        let n = dims.length - 1;
        this.mults = new Array(n);
        this.splits = new Array(n);
        let cost;
        let j;

        //Build 2D array
        for (let i = 0; i < n; i++) {
            this.mults[i] = new Array(n);
            this.splits[i] = new Array(n);
        }

        //Zero out when i = j
        for (let i = 0; i < n; i++) {
            this.mults[i][i] = 0;
        }

        for (let len = 1; len < n; len++) {
            for (let i = 0; i < n - len; i++) {
                j = i + len;
                this.mults[i][j] = Number.MAX_SAFE_INTEGER;
                for (let k = i; k < j; k++) {
                    cost = this.mults[i][k] + this.mults[k + 1][j] + dims[i] * dims[k + 1] * dims[j + 1];
                    console.log(this.mults[i][k] + " + " + this.mults[k + 1][j] + " + " + dims[i] + " * " + dims[k + 1] + " * " + dims[j + 1]);
                    if (cost < this.mults[i][j]) {
                        this.mults[i][j] = cost;
                        this.splits[i][j] = k;
                    }
                }
            }
        }
    }

    printOptimalParens(s, i, j) {
        let retString = "";
        if (i === j)
            retString += "A" + i;
        else {
            retString += ("(");
            retString += this.printOptimalParens(s, i, s[i][j]);
            retString += '*';
            retString += this.printOptimalParens(s, s[i][j] + 1, j);
            retString += (")");
        }

        return retString;
    }

    runNextOne = (next) => {
        this.matrixChainOrder(next);
    }
    
    render() {
        let sample1 = [5, 20, 1, 2, 10];
        let sample2 = [5, 10, 3, 12, 5, 50, 6];
        

        return <div>
            {this.runNextOne(sample1)}
            <h1>[5,20,1,2,10]</h1>
            Optimal Parenthesis: {this.printOptimalParens(this.splits, 0, this.splits.length - 1)}
            <Table title={"Mults"} value={this.mults} />
            <Table title={"Splits"} value={this.splits} />
            <h1>[5,10,3,12,5,50,6]</h1>
            {this.runNextOne(sample2)}
            Optimal Parenthesis: {this.printOptimalParens(this.splits, 0, this.splits.length - 1)}
            <Table title={"Mults"} value={this.mults} />
            <Table title={"Splits"} value={this.splits} />
        </div>
    }
}

export default Main;