<?php
include 'header.php';
?>

<!-- <main id="home">
    
</main> -->

<main class="container wrapper center-align center">
    <div class="container" id="firstStep">
        <div class="row center">
            <img class="logo circle" src="assets/img/npm-logo.jpg" alt="npm-logo" />
        </div>
        <div class="row center">
            <form action="board.php" method="POST" enctype="multipart/form-data" id="converter">
                <button class="waves-effect waves-light btn" name="action"><i class="material-icons left">cloud</i>Commencer</a>
            </form>
        </div>
    </div>
    <div id="secondStep">
        <h1>Tableau des engagés</h1>
        <form enctype="multipart/form-data">
            <div class="container">
                <div class="row">
                    <div class="input-field col s3" id="first">
                        <p>
                            <label>
                                <input type="checkbox" id="catSort" class="checkboxes" />
                                <span>Trier par catégorie</span>
                            </label>
                        </p>
                    </div>

                    <div class="input-field col s3" id="second">
                        <p>
                            <label>
                                <input type="checkbox" id="sexSort" class="checkboxes" />
                                <span>Trier par sexe</span>
                            </label>
                        </p>
                    </div>
                    <div class="input-field col s3" id="third">
                        <p>
                            <label>
                                <input type="checkbox" id="typeSort" class="checkboxes" />
                                <span>Trier par type de compétition</span>
                            </label>
                        </p>
                    </div>
                    <div class="input-field col s3" id="fourth">
                        <i class="material-icons prefix">search</i>
                        <input id="athSearch" type="text" class="validate">
                        <label for="athSearch">Rechercher</label>
                    </div>

                </div>
            </div>
        </form>
        <div class="row" id="boardArea">
            <table class="centered responsive-table" id="board">
                <thead>
                    <tr>
                        <th id="">Actions</th>
                        <th id="last_name">Nom</th>
                        <th id="first_name">Prénom</th>
                        <th id="club">Club</th>
                        <th id="gender">Genre</th>
                        <th id="cat_id">Catégorie</th>
                        <th id="type_id">Compétition</th>
                        <th id="swimTime">Engagement</th>
                    </tr>
                </thead>
                <tbody id="athBoard">

                </tbody>
            </table>
        </div>
    </div>
</main>
<?php include 'footer.php'; ?>