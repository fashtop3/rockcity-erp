<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAssessmentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('assessment_configs', function (Blueprint $table) {
            $table->increments('id');

            $table->integer('user_id')->unsigned();
            $table->foreign('user_id')->references('id')->on('users')
                ->onDelete('cascade');

            $table->boolean('enable')->default(0);
            $table->dateTime('starts');
            $table->dateTime('ends');
            $table->softDeletes();
            $table->timestamps();
        });

        Schema::create('assessments', function (Blueprint $table) {
            $table->increments('id');

            $table->integer('assessment_config_id')->unsigned();
            $table->foreign('assessment_config_id')->references('id')->on('assessment_configs')
                ->onDelete('cascade');

            $table->integer('user_id')->unsigned();
            $table->foreign('user_id')->references('id')->on('users')
                ->onDelete('cascade');

            $table->boolean('preview')->defualt(0);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('assessments');
        Schema::drop('assessment_configs');
    }
}
