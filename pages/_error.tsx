import React from 'react';
import styled from 'styled-components';

const ErrorBlock = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  margin 100px;
  font-size: 30px;
  font-weight: bold;
`;

const ErrorCode = styled.div`
  background: linear-gradient(to right, #f54b64, #f78361);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

class Error extends React.Component<{
    statusCode: number
}> {
  static getInitialProps({ res, err } : any) {
    const statusCode = res ? res.statusCode : err ? err.statusCode : null;
    return { statusCode };
  }

  render() {
    if(this.props.statusCode) {
      return (
        <ErrorBlock>
          <div>An error</div>
          <ErrorCode>{this.props.statusCode}</ErrorCode>
          <div>occurred on server</div>
        </ErrorBlock>
      );
    }
  }
}

export default Error;