<?php include 'header.php';?>

<h1 class="center">Options</h1>
<main class="container wrapper center-align center">
    <div class="row">
        <div class="col s12">
            <ul class="tabs tabs-fixed-width">
                <li class="tab col s3"><a class="active" href="#categories" id="cats">Catégories</a></li>
                <li class="tab col s3"><a href="#display" id="show">Affichage</a></li>
                <li class="tab col s3"><a href="#penalties" id="peno">Pénalités</a></li>
            </ul>
        </div>
        <div id="categories" class="col s12">
            <div class="row" id="categoriesOptions">
                <form class="col s12">
                    <div class="row">
                        <div class="input-field col s6">
                            <select id="catSelect">
                                <option disabled selected>Sélectionnez une catégorie</option>
                            </select>
                            <label>Catégories</label>
                        </div>
                        <div class="input-field col s6">
                            <input value="" id="cat_name" type="text" class="validate">
                            <label for="cat_name">Nom de la catégorie</label>
                        </div>
                    </div>
                    <div class="row">
                        <div class="input-field col s3">
                            <input value="" id="swimDistance" type="text" class="validate">
                            <label for="swimDistance">Distance Natation</label>
                        </div>
                        <div class="input-field col s3">
                            <input value="" id="swimTime" type="text" class="validate">
                            <label for="swimTime">Temps de référence</label>
                        </div>
                        <div class="input-field col s3">
                            <input value="" id="swimPoints" type="text" class="validate">
                            <label for="swimPoints">Points</label>
                        </div>
                        <div class="input-field col s3">
                            <input value="" id="swimPtsPerSec" type="text" class="validate">
                            <label for="swimPtsPerSec">Points/secondes</label>
                        </div>
                    </div>
                    <div class="row">
                        <div class="input-field col s3">
                            <input value="" id="lr_distance" type="text" class="validate">
                            <label for="lr_distance">Distance Laser Run</label>
                        </div>
                        <div class="input-field col s3">
                            <input value="" id="lr_time" type="text" class="validate">
                            <label for="lr_time">Temps de référence</label>
                        </div>
                        <div class="input-field col s3">
                            <input value="" id="lr_points" type="text" class="validate">
                            <label for="lr_points">Points</label>
                        </div>
                        <div class="input-field col s3">
                            <input value="" id="lr_turns" type="text" class="validate">
                            <label for="lr_turns">Nombre de tours</label>
                        </div>
                        <div class="input-field col s3">
                            <input value="" id="lr_ptsPerSec" type="text" class="validate">
                            <label for="lr_ptsPerSec">Points/secondes</label>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        <div id="penalties" class="col s12">
            <ul class="collapsible expandable" id="penaltiesOptions">
            </ul>

        </div>
        <div id="display" class="col s12">
            <ul class="collapsible expandable" id="displayOptions">
            </ul>

        </div>
    </div>
</main>

<?php include 'footer.php';?>