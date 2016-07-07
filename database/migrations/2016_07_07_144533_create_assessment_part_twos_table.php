<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAssessmentPartTwosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('assessment_part_twos', function (Blueprint $table) {
            $table->increments('id');

            $table->integer('assessment_id')->unsigned();
            $table->foreign('assessment_id')->references('id')->on('assessments')
                ->onDelete('cascade');

            $table->text('review');
            $table->text('performance');

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
        Schema::drop('assessment_part_twos');
    }
}
