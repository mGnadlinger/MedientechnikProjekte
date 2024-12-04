<body>


<div id="header">
    <img src="./img/nbaLogo.png" alt="" id="headerPicture">

    <div id="nav">
        <div id="navLeft"></div>
        <div id="navRight"></div>
    </div>

</div>

<div class='navigation'>

    <?php if (basename($_SERVER['PHP_SELF']) == 'index.html') echo '<h2>Teams</h2>';
    if (basename($_SERVER['PHP_SELF']) == 'player.php') echo '<h2>Players</h2>'; ?>


    <?php if (basename($_SERVER['PHP_SELF']) == 'index.html') {
        echo '<div class="row" id="teamSortRow">
            <div onclick="sortTeams(\'name\')" class="teamSortCategory"><p>Sort by name</p></div>
            <div onclick="sortTeams(\'location\')" class="teamSortCategory"><p>Sort by location</p></div>
            <div onclick="sortTeams(\'score\')" class="teamSortCategory"><p>Sort by score</p></div>
            <div onclick="sortTeams(\'unsort\')" class="teamSortCategory"><p>Unsorted</p></div> 
        </div>';

        echo "<div class='content'></div>";
    }
    ?>

</div>



