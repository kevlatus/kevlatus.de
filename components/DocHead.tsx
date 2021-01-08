import Head from "next/head";
import { FunctionComponent } from "react";

const DocHead: FunctionComponent = function () {
	return (
		<Head>
			<title>Kevin Latusinski</title>
			<link rel="icon" href="/favicon.ico" />
      <link rel="preload" href="https://use.typekit.net/xhs5wzt.css" />
			<link rel="stylesheet" href="https://use.typekit.net/xhs5wzt.css" />
		</Head>
	);
};

export default DocHead;
