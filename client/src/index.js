import ReactDOM from 'react-dom';
import * as React from 'react';
import {Component} from 'react-simplified';
import {HashRouter, Route} from 'react-router-dom';
import {services} from './services';
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-matlab";
import "ace-builds/src-noconflict/theme-monokai";

class Home extends Component {
    state = {
        value: "%Sample Code: (fibonachi sequence n = 25)\n\n" +
            "a = 0;\n" +
            "b = 1;\n" +
            "n = 25;\n" +
            "for i = 1:n %term for n\n" +
            "    fprintf('\\t')\n" +
            "    fprintf('%d',a);\n" +
            "    c = a + b;\n" +
            "    a = b;\n" +
            "    b = c;\n" +
            "end\n",
        result: ""
    };

    setResult(string) {
        this.setState({result: string});
    }
    onChange(newValue) {
        this.setState({value: newValue});
    }

    render() {
        return (
            <div className="container mt-2 mb-2 w-100" style={{minHeight: '60vh'}}>
                <div className="row">
                    <div className="col">
                        <h1>Input:</h1>
                        <AceEditor
                            mode="matlab"
                            theme="monokai"
                            name="blah2"
                            onChange={this.onChange}
                            value ={this.state.value}
                            fontSize={14}
                            width={"100%"}
                            height={"55vh"}
                            showPrintMargin={true}
                            showGutter={true}
                            highlightActiveLine={true}

                            setOptions={{
                                enableBasicAutocompletion: true,
                                enableLiveAutocompletion: true,
                                enableSnippets: false,
                                showLineNumbers: true,
                                tabSize: 2,
                            }}/>

                    </div>
                    <div className="col">
                        <h1 className={"text-center"}>Output:</h1>
                        <textarea style={{height: "55vh"}}  type={"text"} disabled={true} value={this.state.result}/>
                    </div>
                </div>
                <div className="row mt-2 mb-5">
                    <div className="col">
                        <button className={"btn btn-info"} onClick={this.execute}>Execute</button>
                    </div>
                    <div className="col">
                        <button className={"btn btn-danger"} onClick={() => this.setResult("")}>Clear</button>
                    </div>
                </div>


            </div>
        )

    }

    execute() {
        services.postCode(this.state.value);
        this.getResult();
    }

    getResult() {
        services.getResult().then(e => this.setResult(e))
    }
}


const root = document.getElementById('root');
if (root)
    ReactDOM.render(
        <HashRouter>
            <div>
                <Route exact path="/" component={Home}/>
            </div>
        </HashRouter>,
        root
    );
