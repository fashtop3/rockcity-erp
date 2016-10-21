<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSubscriptionAttachmentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('subscription_attachments', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('schedule_product')->unsigned();
            $table->foreign('schedule_product')
                ->references('id')
                ->on('schedule_products')
                ->onDelete('cascade');
            $table->integer('schedule_product_sub')->unsigned();
            $table->foreign('schedule_product_sub')
                ->references('id')
                ->on('schedule_product_subs')
                ->onDelete('cascade');
            $table->string('filename')->nullable();
            $table->string('filesize')->nullable();
            $table->string('filetype')->nullable();
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
        Schema::drop('subscription_attachments');
    }
}
