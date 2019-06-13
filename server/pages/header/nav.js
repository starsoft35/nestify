import React, { Component } from 'react';
import Link from 'next/link';
import './header.less';

class Nav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            navs: [
                {
                    text: '首页',
                    isActived: true,
                    path: '/'
                },
                {
                    text: '话题',
                    isActived: false,
                    path: '/topics'
                },
                {
                    text: '专辑',
                    isActived: false,
                    path: '/books'
                }
            ]
        };
    }

    handelClick = (i) => {
        //console.log(i)
        let navs = this.state.navs;
        navs.forEach((item, index) => {
            if (index === i) {
                item.isActived = true;
            } else {
                item.isActived = false;
            }
        });
        this.setState({
            navs: navs
        });
    };
    render() {
        return (
            <ul>
                {this.state.navs.map((item, index) => {
                    return (
                        <li
                            key={item.path}
                            className={item.isActived ? 'activeLi' : ''}
                            onClick={this.handelClick.bind(this, index)}
                        >
                            <Link href={item.path}>
                                <a>{item.text}</a>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        );
    }
}

export default Nav;
