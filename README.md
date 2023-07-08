
# Table of Contents

1.  [使用](#org9eccb45)
2.  [字体样式](#org40231a5)
3.  [特殊说明](#org7b6d1b0)
    1.  [quote 摘要、引用](#orgbd38d9f)
    2.  [notice 注意事项、提醒](#orgabb3965)
    3.  [declare a reference](#orge9f631e)
4.  [段落及高亮](#org2189ce1)
5.  [表格](#org741cbb5)
    1.  [awk 表格](#org2e921b2)
    2.  [表格自增 id](#org3da7c62)
6.  [LaTex 公式](#orgf0c2def)
7.  [Org 代码](#orgcc7530a)
    1.  [Java 代码](#org10502e0)
    2.  [babel java](#orgc432818)
8.  [图片](#orge139eab)
    1.  [引用本地图片](#orgbeb94e6)
    2.  [dot](#orgdb3d6ef)
    3.  [dot sk](#org12ef42a)
    4.  [plantuml with style css](#org2ec2977)
    5.  [plant uml 系统 Contex 架构图](#orgf74f511)
    6.  [泳道图](#org69347ca)
    7.  [plantuml 通过html自定义图片样式](#orga6c57d6)
9.  [org 转 Word](#org48e8db8)
10. [插入时间](#orgaed6368)

> 样式引用：<https://docs.doomemacs.org/latest/#/modules>  

一个类 **doom doc** 的 **org html** 样式模版 [点此预览🪄](http://1.117.167.195/doc/doomorgstyle.html)  


<a id="org9eccb45"></a>

# 使用

配置 **snippet** 模版，然后在 **org mode** 文件中使用 `tt` `tab` 就可展开此模版。  

    # -*- mode: snippet -*-
    # name: title
    # key: tt
    # --
    #+title: `(file-name-sans-extension (buffer-name))`
    #+SUBTITLE: this is subtitle
    #+AUTHOR: autor
    #+HTML_HEAD: <script src="scroll.js"></script>
    #+HTML_HEAD: <link rel="stylesheet" type="text/css" href="org_css.css"/>
    #+HTML_HEAD: <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    #+OPTIONS: prop:nil timestamp:t \n:t ^:nil f:t toc:t author:t num:t H:2
    #+LATEX_COMPILER: xelatex
    #+LATEX_CLASS: elegantpaper
    #+MACRO: htmlred @@html:<font color="red"></font>@@
    #+MACRO: latexred @@latex:{\color{red}@@@@latex:}@@
    #+latex:\newpage

<div class="notice-info" id="orgc593081">
<p>
想使用在线版的静态文件，可以使用下面的配置进行替换<br />
</p>

</div>

    #+HTML_HEAD: <link href="https://emacs-1308440781.cos.ap-chengdu.myqcloud.com/org_css.css" rel="stylesheet"></link>
    #+HTML_HEAD: <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    #+HTML_HEAD: <script src="https://emacs-1308440781.cos.ap-chengdu.myqcloud.com/scroll.js"></script>


<a id="org40231a5"></a>

# 字体样式

<table border="2" cellspacing="0" cellpadding="6" rules="groups" frame="hsides">
<caption class="t-bottom"><span class="table-number">Table 1:</span> 字体样式说明</caption>

<colgroup>
<col  class="org-left" />

<col  class="org-left" />
</colgroup>
<tbody>
<tr>
<td class="org-left">粗体</td>
<td class="org-left"><b>bold</b></td>
</tr>


<tr>
<td class="org-left">斜体</td>
<td class="org-left"><i>italic</i></td>
</tr>


<tr>
<td class="org-left">下划线</td>
<td class="org-left"><span class="underline">underlined</span></td>
</tr>


<tr>
<td class="org-left">中横线</td>
<td class="org-left"><del>strike-through</del></td>
</tr>


<tr>
<td class="org-left">代码，按键</td>
<td class="org-left"><code>code</code></td>
</tr>
</tbody>
</table>


<a id="org7b6d1b0"></a>

# 特殊说明


<a id="orgbd38d9f"></a>

## quote 摘要、引用

可使用\`quote\`来进行代码块补全，表示摘要，引用  

> TECO - Tape [later text] Editor/COrrector  
> A combination text editor/really horrible ProgrammingLanguage. To quote the paper &ldquo;RealProgrammers don&rsquo;t use Pascal&rdquo; (1983):  


<a id="orgabb3965"></a>

## notice 注意事项、提醒

<div class="notice-info" id="orgc03c1bc">
<p>
你有许多已标记的项目并且你可能错过一个重要的项目时，提醒可以提供帮助<br />
</p>

</div>

<div class="notice-warning" id="org1ec62e1">
<p>
Please do not file or answer Doom Emacs issues on Reddit, Twitter, or StackOverflow. Kindly refer them to this section.<br />
</p>

</div>

<div class="notice-example" id="orge63ebe5">
<p>
这是 1 个例子<br />
</p>

</div>


<a id="orge9f631e"></a>

## declare a reference

According to the documentation [Internal-Links](https://orgmode.org/manual/Internal-Links.html) we know there have two ways to sign a particular tag.  

1.  the outline of org mode is an natural linkable tag.
2.  use <a id="orge3625fb"></a> to declare a linkable tag.


<a id="org2189ce1"></a>

# 段落及高亮

Example of an  comment.  

原文：[用友 bip 产品功能说明](https://iuap.yonyoucloud.com/doc/yonbuilder.html#/md-build/yonbuilder/articles/yonbuilder/1-/notes.md?key=%E5%8F%91%E7%89%88%E8%AF%B4%E6%98%8E) ，在说明文档  

大数据中 **最宝贵** 、最难以代替的就是数据，一切都围绕数据。  

HDFS 是最早的大数据存储系统，存储着宝贵的数据资产，各种新算法、框架要想得到广泛使用，必须支持 HDFS，才能获取已存储在里面的数据。所以大数据技术越发展，新技术越多，HDFS 得到的支持越多，越离不开 HDFS。HDFS 也许不是最好的大数据存储技术，但依然是最重要的大数据存储技术。  

HDFS 是如何实现大数据高速、可靠的存储和访问的呢？  

-   Hadoop 分布式文件系统 HDFS 的设计目标是管理数以千计的服务器、数以万计的磁盘，将大规模的服务器计算资源当作一个单一存储系统进行管理，对应用程序提供数以 PB 计的存储容量，让应用程序像使用普通文件系统一样存储大规模的文件数据。


<a id="org741cbb5"></a>

# 表格

`C-c ~` to convert to tabel.el table  
`C-c ~` to convert to org table  
org table `M-h` `M-l` for move Columns left and right  
org table `M-k` `M-j` for move Rows up and down  

    # table.el for merge Columns or Rows

<table border="2" cellspacing="0" cellpadding="6" rules="groups" frame="hsides">
<caption class="t-bottom"><span class="table-number">Table 2:</span> square</caption>

<colgroup>
<col  class="org-right" />
</colgroup>

<colgroup>
<col  class="org-right" />

<col  class="org-right" />

<col  class="org-right" />
</colgroup>

<colgroup>
<col  class="org-right" />

<col  class="org-right" />
</colgroup>
<thead>
<tr>
<th scope="col" class="org-right">N</th>
<th scope="col" class="org-right">N^2</th>
<th scope="col" class="org-right">N^3</th>
<th scope="col" class="org-right">N^4</th>
<th scope="col" class="org-right">sqrt(n)</th>
<th scope="col" class="org-right">sqrt[4](N)</th>
</tr>
</thead>

<tbody>
<tr>
<td class="org-right">1</td>
<td class="org-right">1</td>
<td class="org-right">1</td>
<td class="org-right">1</td>
<td class="org-right">1</td>
<td class="org-right">1</td>
</tr>


<tr>
<td class="org-right">2</td>
<td class="org-right">4</td>
<td class="org-right">8</td>
<td class="org-right">16</td>
<td class="org-right">1.4142136</td>
<td class="org-right">1.1892071</td>
</tr>


<tr>
<td class="org-right">3</td>
<td class="org-right">9</td>
<td class="org-right">27</td>
<td class="org-right">81</td>
<td class="org-right">1.7320508</td>
<td class="org-right">1.3160740</td>
</tr>
</tbody>
</table>

<table border="2" cellspacing="0" cellpadding="6" rules="groups" frame="hsides">
<caption class="t-bottom"><span class="table-number">Table 3:</span> student</caption>

<colgroup>
<col  class="org-left" />

<col  class="org-right" />

<col  class="org-right" />

<col  class="org-right" />

<col  class="org-right" />

<col  class="org-right" />
</colgroup>
<thead>
<tr>
<th scope="col" class="org-left">Student</th>
<th scope="col" class="org-right">Prob 1</th>
<th scope="col" class="org-right">Prob 2</th>
<th scope="col" class="org-right">Prob 3</th>
<th scope="col" class="org-right">Total</th>
<th scope="col" class="org-right">Note</th>
</tr>
</thead>

<tbody>
<tr>
<td class="org-left">Maximum</td>
<td class="org-right">10</td>
<td class="org-right">15</td>
<td class="org-right">25</td>
<td class="org-right">50</td>
<td class="org-right">10.0</td>
</tr>
</tbody>

<tbody>
<tr>
<td class="org-left">Peter</td>
<td class="org-right">10</td>
<td class="org-right">8</td>
<td class="org-right">23</td>
<td class="org-right">41</td>
<td class="org-right">8.2</td>
</tr>


<tr>
<td class="org-left">Sam</td>
<td class="org-right">2</td>
<td class="org-right">4</td>
<td class="org-right">3</td>
<td class="org-right">9</td>
<td class="org-right">1.8</td>
</tr>
</tbody>

<tbody>
<tr>
<td class="org-left">Average</td>
<td class="org-right">&#xa0;</td>
<td class="org-right">&#xa0;</td>
<td class="org-right">&#xa0;</td>
<td class="org-right">25.0</td>
<td class="org-right">&#xa0;</td>
</tr>
</tbody>
</table>

<table border="2" cellspacing="0" cellpadding="6" rules="groups" frame="hsides">
<caption class="t-bottom"><span class="table-number">Table 4:</span> long table</caption>

<colgroup>
<col  class="org-left" />

<col  class="org-left" />

<col  class="org-left" />

<col  class="org-left" />

<col  class="org-left" />

<col  class="org-left" />

<col  class="org-right" />

<col  class="org-right" />
</colgroup>
<thead>
<tr>
<th scope="col" class="org-left">Format</th>
<th scope="col" class="org-left">Fine-grained-control</th>
<th scope="col" class="org-left">Initial Effort</th>
<th scope="col" class="org-left">Syntax simplicity</th>
<th scope="col" class="org-left">Editor Support</th>
<th scope="col" class="org-left">Integrations</th>
<th scope="col" class="org-right">Ease-of-referencing</th>
<th scope="col" class="org-right">Versatility</th>
</tr>
</thead>

<tbody>
<tr>
<td class="org-left">Word</td>
<td class="org-left">Word^2</td>
<td class="org-left">Word^3</td>
<td class="org-left">Word^4</td>
<td class="org-left">sqrt(Word)</td>
<td class="org-left">sqrt(sqrt(Word))</td>
<td class="org-right">2</td>
<td class="org-right">2</td>
</tr>


<tr>
<td class="org-left">LaTeX</td>
<td class="org-left">LaTeX^2</td>
<td class="org-left">LaTeX^3</td>
<td class="org-left">LaTeX^4</td>
<td class="org-left">sqrt(LaTeX)</td>
<td class="org-left">sqrt(sqrt(LaTeX))</td>
<td class="org-right">4</td>
<td class="org-right">3</td>
</tr>


<tr>
<td class="org-left">Org Mode</td>
<td class="org-left">Org^2 Mode^2</td>
<td class="org-left">Org^3 Mode^3</td>
<td class="org-left">Org^4 Mode^4</td>
<td class="org-left">sqrt(Org Mode)</td>
<td class="org-left">sqrt(sqrt(Org Mode))</td>
<td class="org-right">4</td>
<td class="org-right">4</td>
</tr>


<tr>
<td class="org-left">Markdown</td>
<td class="org-left">Markdown^2</td>
<td class="org-left">Markdown^3</td>
<td class="org-left">Markdown^4</td>
<td class="org-left">sqrt(Markdown)</td>
<td class="org-left">sqrt(sqrt(Markdown))</td>
<td class="org-right">3</td>
<td class="org-right">1</td>
</tr>


<tr>
<td class="org-left">Markdown + Pandoc</td>
<td class="org-left">(Markdown + Pandoc)^2</td>
<td class="org-left">(Markdown + Pandoc)^3</td>
<td class="org-left">(Markdown + Pandoc)^4</td>
<td class="org-left">sqrt(Markdown + Pandoc)</td>
<td class="org-left">sqrt(sqrt(Markdown + Pandoc))</td>
<td class="org-right">3</td>
<td class="org-right">2</td>
</tr>
</tbody>
</table>


<a id="org2e921b2"></a>

## awk 表格

<table id="org671d5c9" border="2" cellspacing="0" cellpadding="6" rules="groups" frame="hsides">


<colgroup>
<col  class="org-left" />

<col  class="org-right" />

<col  class="org-left" />

<col  class="org-left" />
</colgroup>
<tbody>
<tr>
<td class="org-left">aardvark</td>
<td class="org-right">555-5553</td>
<td class="org-left">1200/300</td>
<td class="org-left">B</td>
</tr>


<tr>
<td class="org-left">alpo-net</td>
<td class="org-right">555-3412</td>
<td class="org-left">2400/1200/300</td>
<td class="org-left">A</td>
</tr>


<tr>
<td class="org-left">barfly</td>
<td class="org-right">555-7685</td>
<td class="org-left">1200/300</td>
<td class="org-left">A</td>
</tr>


<tr>
<td class="org-left">bites</td>
<td class="org-right">555-1675</td>
<td class="org-left">2400/1200/300</td>
<td class="org-left">A</td>
</tr>


<tr>
<td class="org-left">camelot</td>
<td class="org-right">555-0542</td>
<td class="org-left">300</td>
<td class="org-left">C</td>
</tr>


<tr>
<td class="org-left">core</td>
<td class="org-right">555-2912</td>
<td class="org-left">1200/300</td>
<td class="org-left">C</td>
</tr>


<tr>
<td class="org-left">fooey</td>
<td class="org-right">555-1234</td>
<td class="org-left">2400/1200/300</td>
<td class="org-left">B</td>
</tr>


<tr>
<td class="org-left">foot</td>
<td class="org-right">555-6699</td>
<td class="org-left">1200/300</td>
<td class="org-left">B</td>
</tr>


<tr>
<td class="org-left">macfoo</td>
<td class="org-right">555-6480</td>
<td class="org-left">1200/300</td>
<td class="org-left">A</td>
</tr>


<tr>
<td class="org-left">sdace</td>
<td class="org-right">555-3430</td>
<td class="org-left">2400/1200/300</td>
<td class="org-left">A</td>
</tr>


<tr>
<td class="org-left">sabafoo</td>
<td class="org-right">555-2127</td>
<td class="org-left">1200/300</td>
<td class="org-left">C</td>
</tr>
</tbody>
</table>

    /foo/ { print $0 }

<table border="2" cellspacing="0" cellpadding="6" rules="groups" frame="hsides">
<caption class="t-bottom"><span class="table-number">Table 5:</span> 筛选出 foo 匹配的行</caption>

<colgroup>
<col  class="org-left" />

<col  class="org-right" />

<col  class="org-left" />

<col  class="org-left" />
</colgroup>
<tbody>
<tr>
<td class="org-left">fooey</td>
<td class="org-right">555-1234</td>
<td class="org-left">2400/1200/300</td>
<td class="org-left">B</td>
</tr>


<tr>
<td class="org-left">foot</td>
<td class="org-right">555-6699</td>
<td class="org-left">1200/300</td>
<td class="org-left">B</td>
</tr>


<tr>
<td class="org-left">macfoo</td>
<td class="org-right">555-6480</td>
<td class="org-left">1200/300</td>
<td class="org-left">A</td>
</tr>


<tr>
<td class="org-left">sabafoo</td>
<td class="org-right">555-2127</td>
<td class="org-left">1200/300</td>
<td class="org-left">C</td>
</tr>
</tbody>
</table>


<a id="org3da7c62"></a>

## 表格自增 id

The target scope which at the left of equation , @ means row number and $ means column nubmer of increasing from one.  
The expression which at the right of equation  , @# stands for the row number of increasing from zero.  

<table border="2" cellspacing="0" cellpadding="6" rules="groups" frame="hsides">


<colgroup>
<col  class="org-right" />

<col  class="org-left" />

<col  class="org-left" />
</colgroup>
<tbody>
<tr>
<td class="org-right">序号</td>
<td class="org-left">字段名</td>
<td class="org-left">名称</td>
</tr>


<tr>
<td class="org-right">1</td>
<td class="org-left">age</td>
<td class="org-left">年龄</td>
</tr>


<tr>
<td class="org-right">2</td>
<td class="org-left">bir</td>
<td class="org-left">出生年月日</td>
</tr>
</tbody>
</table>

    #+tblfm: $1=@#-1

`C-c` `C-c` to execute it  


<a id="orgf0c2def"></a>

# LaTex 公式

    $\mbox{需求的价格弹性系数} = \frac{\mbox{需求的变动率}}{\mbox{价格的变动率}}$

$$\mbox{需求的价格弹性系数} = \frac{\mbox{需求的变动率}}{\mbox{价格的变动率}}$$  

$$\begin{aligned}
\cos 3\theta & = \cos (2 \theta + \theta) \\
& = \cos 2 \theta \cos \theta - \sin 2 \theta \sin \theta \\
& = (2 \cos ^2 \theta -1) \cos \theta - (2 \sin \theta\cos \theta ) \sin \theta \\
& = 2 \cos ^3 \theta - \cos \theta - 2 \sin ^2 \theta \cos \theta \\
& = 2 \cos ^3 \theta - \cos \theta - 2 (1 - \cos ^2 \theta )\cos \theta \\
& = 4 \cos ^3 \theta -3 \cos \theta
\end{aligned} $$  


<a id="orgcc7530a"></a>

# Org 代码

代码片段开启行号，修改 \`~/.emacs.d/.local/straight/repos/org/lisp/ox-html.el\`  

    (let* ((code-lines (split-string code "\n"))
       (code-length (length code-lines))
       (num-fmt
    	(and num-start
    	     (format "%%%ds "
    	     (format "%(add-hook 'code-review-mode-hook
            (lambda ()
              ;; include *Code-Review* buffer into current workspace
              (persp-add-buffer (current-buffer))))%%ds: "


<a id="org10502e0"></a>

## Java 代码

    /**
     * @param request 调用的请求参数
     * @param needLog true 需要记录日志  false 不记录日志
     * @return
     */
    protected NcApiResponse runApply(NcApiRequest request, Boolean needLog) {
        NcApiResponse ncApiResponse = null;
        try {
            final NcApiRequest ncApiRequest = executeBefore(request);
            ncApiResponse = executeGetRequest(ncApiRequest);
        } catch (Exception e) {
            afterExecute(needLog, e, request, ncApiResponse);
            if (e instanceof BizException) {
                throw new BizException("NC 提示", ((BizException) e).getErrorMsg(), e);
            } else {
                throw new BizException("NC 异常", e.getMessage());
            }
        }
    
        return ncApiResponse;
    }


<a id="orgc432818"></a>

## babel java

    List<Integer> a = Arrays.asList(1, 2);
    return a;

`C-c` `C-c` to execute it, but export to html will fail when the babel java result generated.  


<a id="orge139eab"></a>

# 图片


<a id="orgbeb94e6"></a>

## 引用本地图片

![img](./image/excalidraw-demo.svg "create by <https://excalidraw.com/>")  


<a id="orgdb3d6ef"></a>

## dot

![img](image/dot-graphviz-demo.svg "XX 系统 v1.2.3 架构图")  


<a id="org12ef42a"></a>

## dot sk

![img](image/dot-sk-graphviz-demo.svg "手绘风格的 dot graphviz")  


<a id="org2ec2977"></a>

## plantuml with style css

plantuml 替换原生样式  
DARKO   RANGE/LIGHTORANGE/DARKBLUE/LIGHTBLUE/DARKRED/LIGHTRED/DARKGREEN/LIGHTGREEN  

    !define LIGHTORANGE
    !includeurl C4-PlantUML/juststyle.puml

![img](image/plant-uml-order.svg "有样式的 plantuml 时序图")  


<a id="orgf74f511"></a>

## plant uml 系统 Contex 架构图

plantuml 替换原生样式  
DARKORANGE/LIGHTORANGE/DARKBLUE/LIGHTBLUE/DARKRED/LIGHTRED/DARKGREEN/LIGHTGREEN  

    !define LIGHTBLUE
    !includeurl C4-PlantUML/juststyle.puml

![img](image/plantuml-c4.svg "系统 Contex 架构图")  


<a id="org69347ca"></a>

## 泳道图

![img](./image/plantuml-swiming.svg)  


<a id="orga6c57d6"></a>

## plantuml 通过html自定义图片样式

![img](image/oa-center.svg)  


<a id="org48e8db8"></a>

# org 转 Word

    pandoc -o ~/Desktop/out.docx ~/.doom.d/README.org


<a id="orgaed6368"></a>

# 插入时间

<table border="2" cellspacing="0" cellpadding="6" rules="groups" frame="hsides">


<colgroup>
<col  class="org-left" />

<col  class="org-left" />
</colgroup>
<tbody>
<tr>
<td class="org-left"><code>C-c .</code></td>
<td class="org-left">插入当前时间 <span class="timestamp-wrapper"><span class="timestamp">&lt;2023-02-25 Sat&gt;</span></span></td>
</tr>


<tr>
<td class="org-left"><code>K</code></td>
<td class="org-left">lask week</td>
</tr>


<tr>
<td class="org-left"><code>J</code></td>
<td class="org-left">next week</td>
</tr>


<tr>
<td class="org-left"><code>L</code></td>
<td class="org-left">next day</td>
</tr>
</tbody>
</table>

